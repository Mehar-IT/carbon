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
  authorizePermisions,
} = require("../middleware/auth");

router
  .route("/addSubscription")
  .post(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizePermisions,
    addSubscription
  );
router
  .route("/getallSubscriptions")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    getallSubscriptions
  );
router
  .route("/mySubscriptions")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizePermisions,
    mySubscriptions
  );
router
  .route("/getSingleSubscription/:id")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizePermisions,
    getSingleSubscription
  );
router
  .route("/updateUserSubscription/:id")
  .put(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizePermisions,
    updateUserSubscription
  );
router
  .route("/deleteUserSubscription/:id")
  .delete(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizePermisions,
    deleteUserSubscription
  );

module.exports = router;
