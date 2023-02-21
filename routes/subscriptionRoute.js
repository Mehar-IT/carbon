const express = require("express");
const {
  addSubscription,
  updateUserSubscription,
  mySubscriptions,
  deleteUserSubscription,
  getSingleSubscription,
  getallSubscriptions,
} = require("../controllers/subscriptionController");
const router = express.Router();
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

router.route("/addSubscription").post(isAuthenticated, addSubscription);
router
  .route("/getallSubscriptions/:id")
  .get(isAuthenticated, authorizeRole("admin"), getallSubscriptions);
router.route("/mySubscriptions").get(isAuthenticated, mySubscriptions);
router
  .route("/getSingleSubscription/:id")
  .get(isAuthenticated, getSingleSubscription);
router
  .route("/updateUserSubscription/:id")
  .put(isAuthenticated, updateUserSubscription);
router
  .route("/deleteUserSubscription/:id")
  .delete(isAuthenticated, deleteUserSubscription);

module.exports = router;
