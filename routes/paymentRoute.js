const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
  // refundPayment,
  // createPlan,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticated, authorizeByAdmin } = require("../middleware/auth");

router
  .route("/payment/process")
  .post(isAuthenticated, authorizeByAdmin(true), processPayment);
router
  .route("/stripeapikey")
  .get(isAuthenticated, authorizeByAdmin(true), sendStripeApiKey);

// router.route("/payment/refundPayment").get(isAuthenticated, refundPayment);
// router
//   .route("/createPlan")
//   .get(isAuthenticated, authorizeRole("admin"), createPlan);

module.exports = router;
