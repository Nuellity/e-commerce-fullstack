const router = require("express").Router();
const User = require("../models/user");
const GoogleAuth = require("../models/googleAuth");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const sendEmail = require("../sendEmail");
const myModule = require("../template");

const welcomeEmail = myModule.welcome;

// SIGN UP

router.post("/signup", async (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString(),
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    zipcode: req.body.zipcode,
  });
  try {
    const savedUser = await newUser.save();

    const subject = "Welcome to Ayaba";
    const send_to = req.body.email;
    const sent_from = process.env.EMAIL_USER;
    const message = welcomeEmail;
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).send({ success: true, message: "Email sent" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// SIGN IN

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Wrong Credentials!! Please try again");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    );
    const correctPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (correctPassword !== req.body.password) {
      return res.status(401).json("Wrong Credentials!! Please try again");
    }

    const accesstoken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password, ...remainderInfo } = user._doc;
    res.status(200).json({ ...remainderInfo, accesstoken });
  } catch (error) {
    res.status(500).json(error);
  }
});

//GOOGLE AUTHENTICATION

router.post("/google-signin", async (req, res) => {
  try {
    const { email, googleId } = req.body;
    let user = await GoogleAuth.findOne({ email });
    if (user) {
      const accesstoken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "15h" }
      );
      const { googleId: userId, ...remainderInfo } = user._doc;
      return res.status(200).json({ ...remainderInfo, accesstoken });
    }
    user = new GoogleAuth({ email, googleId });
    await user.save();

    const accesstoken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15h" }
    );
    const { googleId: userId, ...remainderInfo } = user._doc;
    res.status(200).json({ ...remainderInfo, accesstoken });
  } catch (error) {
    res.status(500).json(error);
  }
});

//CHANGE PASSWORD

router.post("/forgotpassword", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Wrong Credentials!! Please try again");
    }
    if (user.isAdmin) {
      return res.status(401).json("You are not authorized");
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    );
    const correctPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (correctPassword === req.body.password) {
      return res.status(401).json("Password has already been used");
    }
    const newPassword = await User.findOneAndUpdate(
      { email: user.email },
      {
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SECRET
        ).toString(),
      }
    );
    res.status(200).json(newPassword);
  } catch (error) {}
});

module.exports = router;
