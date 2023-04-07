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
  authorizePermisions,
} = require("../middleware/auth");

router.route("/addfund").post(isAuthenticated, authorizeByAdmin(true), addFund);
router
  .route("/getSinglefund/:id")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    getSinglefund,
    authorizePermisions
  );
router
  .route("/getallfunds")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    getallfunds
  );
router
  .route("/getmyfunds/:userId")
  .get(isAuthenticated, authorizeByAdmin(true), authorizePermisions, myfunds);
router
  .route("/updateUserFund/:id")
  .put(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    updateUserFund
  );
router
  .route("/addFundByAdmin/:id")
  .put(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    addFundByAdmin
  );

router
  .route("/deletefund/:id")
  .delete(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    deleteUserFund
  );

module.exports = router;
