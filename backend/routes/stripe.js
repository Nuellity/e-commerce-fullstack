const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.get("/config", (req, res) => {
  res.status(200).json({
    stripePublishKey: process.env.STRIPE_PUBLISH_KEY,
  });
});

router.post("/payment", async (req, res) => {
  const amountInfo = (req.body.amount * 100).toString()
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amountInfo,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({
      error: {
        message: error.message,
      },
    });
  }
});

module.exports = router;
