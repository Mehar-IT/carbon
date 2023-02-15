const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
  refundPayment,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

router
  .route("/payment/process")
  .post(isAuthenticated, authorizeRole("admin"), processPayment);
router
  .route("/payment/refundPayment")
  .get(isAuthenticated, authorizeRole("admin"), refundPayment);

router
  .route("/stripeapikey")
  .get(isAuthenticated, authorizeRole("admin"), sendStripeApiKey);

module.exports = router;
