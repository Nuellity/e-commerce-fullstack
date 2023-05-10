const router = require("express").Router();
const Review = require("../models/review");
const {
  verifyTokenAuthorization,
  verifyTokenAdmin,
  verifyToken,
} = require("./verify");

// CREATE REVIEW

router.post("/", verifyToken, async (req, res) => {
  const newReview = new Review(req.body);
  try {
    const savedReview = await newReview.save();
    res.status(200).json(savedReview);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE REVIEW BY ID

router.patch("/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE REVIEW BY ID

router.delete("/delete/:id", verifyTokenAdmin, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json("Review has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//FIND USER REVIEWS

router.get("/find/user/:userId", verifyToken, async (req, res) => {
  try {
    const review = await Review.find({ userId: req.params.userId });

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json(error);
  }
});

//FIND PRODUCT REVIEWS

router.get("/find/:productId", async (req, res) => {
  try {
    const review = await Review.find({ productId: req.params.productId });

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json(error);
  }
});

//FIND ALL

router.get("/", verifyTokenAdmin, async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
