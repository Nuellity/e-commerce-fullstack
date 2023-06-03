const router = require("express").Router();
const CryptoJS = require("crypto-js");
const User = require("../models/user");
const GoogleAuth = require("../models/googleAuth");
const { verifyTokenAuthorization, verifyTokenAdmin } = require("./verify");

//CREATE USER

router.post("/", verifyTokenAdmin, async (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    img: req.body.img,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString(),
    address: req.body.address,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE USER BY ID

router.patch("/:id", verifyTokenAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE USER BY ID

router.delete("/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//FIND ADMIN USER

router.get("/find/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//FIND ALL USERS

router.get("/", verifyTokenAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    let users = [];

    if (query) {
      const userQuery = await User.find().sort({ createdAt: -1 }).limit(5);
      users.push(...userQuery);
    } else {
      const userQuery = await User.find();
      users.push(...userQuery);
    }

    if (query) {
      const googleAuthQuery = await GoogleAuth.find()
        .sort({ createdAt: -1 })
        .limit(5);
      users.push(...googleAuthQuery);
    } else {
      const googleAuthQuery = await GoogleAuth.find();
      users.push(...googleAuthQuery);
    }

    // Sort the combined user array by createdAt in descending order
    users.sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

//FIND USERS STATISTICS

router.get("/stats", verifyTokenAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const userData = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      { $group: { _id: "$month", totalUsers: { $sum: 1 } } },
    ]);

    const googleAuthData = await GoogleAuth.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      { $group: { _id: "$month", totalUsers: { $sum: 1 } } },
    ]);

    const combinedData = mergeAggregationResults(userData, googleAuthData);

    const formattedData = formatData(combinedData);

    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Function to merge the aggregation results from User and GoogleAuth collections
function mergeAggregationResults(userData, googleAuthData) {
  const mergedData = {};

  // Merge User collection data
  for (const user of userData) {
    mergedData[user._id] = user.totalUsers;
  }

  // Merge GoogleAuth collection data
  for (const googleAuthUser of googleAuthData) {
    if (mergedData.hasOwnProperty(googleAuthUser._id)) {
      mergedData[googleAuthUser._id] += googleAuthUser.totalUsers;
    } else {
      mergedData[googleAuthUser._id] = googleAuthUser.totalUsers;
    }
  }

  return mergedData;
}

// Function to format the data into the desired format
function formatData(combinedData) {
  const formattedData = [];

  for (const [month, totalUsers] of Object.entries(combinedData)) {
    formattedData.push({ _id: parseInt(month), totalUsers });
  }

  return formattedData;
}

module.exports = router;
