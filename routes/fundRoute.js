const express = require("express");
const {
  addFund,
  getSinglefund,
  getallfunds,
  myfunds,
  updateUserFund,
  deleteUserFund,
  addFundByAdmin,
} = require("../controllers/fundController");
const router = express.Router();
const {
  isAuthenticated,
  authorizeRole,
  authorizeByAdmin,
} = require("../middleware/auth");

router.route("/addfund").post(isAuthenticated, authorizeByAdmin(true), addFund);
router
  .route("/getSinglefund/:id")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    getSinglefund
  );
router
  .route("/getallfunds")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    getallfunds
  );
router
  .route("/getmyfunds/:userId")
  .get(isAuthenticated, authorizeByAdmin(true), myfunds);
router
  .route("/updateUserFund/:id")
  .put(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    updateUserFund
  );
router
  .route("/addFundByAdmin/:id")
  .put(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    addFundByAdmin
  );

router
  .route("/deletefund/:id")
  .delete(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    deleteUserFund
  );

module.exports = router;
