const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const stripeKey = require("stripe");

exports.processPayment = asyncErrorHandler(async (req, res, next) => {
  const stripe = stripeKey(process.env.STRIPE_SECRET_KEY);
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
  });
  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});
exports.refundPayment = asyncErrorHandler(async (req, res, next) => {
  const stripe = stripeKey(
    "sk_test_51MIDGASGnkDKt4zlWlIdDTD9yIOM4HgJHQgRTnwpprSsfpni0qWKbeNFNzSpQYVncl3QCrAuoTg9X0sIm4w4XdJX00hOXjIvcM"
  );
  // const stripe = stripeKey(process.env.STRIPE_SECRET_KEY);

  try {
    const refund = await stripe.refunds.create({
      charge: "pm_1Mb0X2SGnkDKt4zlpDR7AbTS",
      // charge: "pi_3Mb0X1SGnkDKt4zl0l6M1FVh",
    });

    res.status(200).json({
      success: true,
      refund,
    });
  } catch (err) {
    throw err;
  }
});

exports.sendStripeApiKey = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
