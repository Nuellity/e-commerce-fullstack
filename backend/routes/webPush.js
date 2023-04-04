const router = require("express").Router();
const webpush = require("web-push");

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
  "mailto:testinofg@gmail.com",
  publicVapidKey,
  privateVapidKey
);

//SUBSCRIBE ROUTE
router.post("/", async (req, res) => {
  //GET PUSH SUBSCRIPTION OBJECT
  const subscription = req.body;

  // Store the subscription information in your database or use it to send a notification immediately
  // For example:
  const payload = JSON.stringify({
    title: "New order received",
    message: "A new order has been placed",
  });
  try {
    await webpush.sendNotification(subscription, payload);
    res.status(201).json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

module.exports = router;
