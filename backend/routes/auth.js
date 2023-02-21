const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// SIGN UP

router.post("/signup", async (req, res) =>{
    const newUser = new User({
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
    })
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error)
    }
})


// SIGN IN

router.post("/signin", async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        !user && res.status(401).json("Incorrect email")

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET)
        const correctPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        correctPassword !== req.body.password && res.status(401).json("Incorrect password")
        
        const accesstoken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )

        const {password, ...remainderInfo} = user._doc
        res.status(200).json({...remainderInfo, accesstoken})
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router;