const router = require("express").Router();
const SavedItem = require("../models/savedItem");
const {
  verifyTokenAuthorization,
  verifyTokenAdmin,
  verifyToken,
} = require("./verify");

// CREATE ORDER

router.post("/", verifyToken, async (req, res) => {
  const newSavedItem = new SavedItem(req.body);
  try {
    const savedItem = await newSavedItem.save();
    res.status(200).json(savedItem);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE SAVED ITEM BY ID

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedItem = await SavedItem.findOneAndDelete({
      productId: req.params.id,
    });
    if (!deletedItem) {
      return res.status(404).json({ error: "SavedItem not found" });
    }
    res.status(200).json("SavedItem has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//FIND USER SAVED ITEMS

router.get("/find/:userId", verifyToken, async (req, res) => {
  try {
    const savedItems = await SavedItem.find({ userId: req.params.userId });

    res.status(200).json(savedItems);
  } catch (error) {
    res.status(500).json(error);
  }
});

//FIND ALL SAVED ITEMS

router.get("/", verifyTokenAdmin, async (req, res) => {
  try {
    const savedItems = await SavedItem.find();
    res.status(200).json(savedItems);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
