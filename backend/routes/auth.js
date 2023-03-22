const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

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
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// SIGN IN

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Wrong Email!");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    );
    const correctPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (correctPassword !== req.body.password) {
      return res.status(401).json("Wrong password!!!");
    }

    const accesstoken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    const { password, ...remainderInfo } = user._doc;
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
      return res.status(401).json("Account not found!!");
    }
    if(user.isAdmin){
        return res.status(401).json("You are not authorized")
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
