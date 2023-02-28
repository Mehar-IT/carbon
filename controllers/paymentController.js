const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.sendStripeApiKey = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});

exports.processPayment = asyncErrorHandler(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
  });
  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

// exports.refundPayment = asyncErrorHandler(async (req, res, next) => {
//   try {
//     const refund = await stripe.refunds.create({
//       charge: "pm_1Mb0X2SGnkDKt4zlpDR7AbTS",
//       // charge: "pi_3Mb0X1SGnkDKt4zl0l6M1FVh",
//     });

//     res.status(200).json({
//       success: true,
//       refund,
//     });
//   } catch (err) {
//     throw err;
//   }
// });

// export const addNewCustomer = async (email) => {
//   const customer = await stripe.customers.create({
//     email,
//     description: "New Customer",
//   });
//   return customer;
// };

// export const getCustomerByID = async (id) => {
//   const customer = await stripe.customers.retrieve(id);
//   return customer;
// };
