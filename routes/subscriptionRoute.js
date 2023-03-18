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
const {
  isAuthenticated,
  authorizeRole,
  authorizeByAdmin,
} = require("../middleware/auth");

router
  .route("/addSubscription")
  .post(isAuthenticated, authorizeByAdmin(true), addSubscription);
router
  .route("/getallSubscriptions")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    getallSubscriptions
  );
router
  .route("/mySubscriptions")
  .get(isAuthenticated, authorizeByAdmin(true), mySubscriptions);
router
  .route("/getSingleSubscription/:id")
  .get(isAuthenticated, authorizeByAdmin(true), getSingleSubscription);
router
  .route("/updateUserSubscription/:id")
  .put(isAuthenticated, authorizeByAdmin(true), updateUserSubscription);
router
  .route("/deleteUserSubscription/:id")
  .delete(isAuthenticated, authorizeByAdmin(true), deleteUserSubscription);

module.exports = router;
