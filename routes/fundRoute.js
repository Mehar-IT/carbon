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
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

router.route("/addfund").post(isAuthenticated, addFund);
router
  .route("/getSinglefund/:id")
  .get(isAuthenticated, authorizeRole("admin"), getSinglefund);
router
  .route("/getallfunds")
  .get(isAuthenticated, authorizeRole("admin"), getallfunds);
router.route("/getmyfunds/:userId").get(isAuthenticated, myfunds);
router
  .route("/updateUserFund/:id")
  .put(isAuthenticated, authorizeRole("admin"), updateUserFund);
router
  .route("/addFundByAdmin/:id")
  .put(isAuthenticated, authorizeRole("admin"), addFundByAdmin);

router
  .route("/deletefund/:id")
  .delete(isAuthenticated, authorizeRole("admin"), deleteUserFund);

module.exports = router;
