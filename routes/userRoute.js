const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateUserProfile,
  getAllUsers,
  validateOPT,
  resentOTP,
  getsindleUserByAdmin,
  updateUserByAdmin,
  deleteUserByAdmin,
} = require("../controllers/userController");
const { isAuthenticated, authorizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/validateOTP/:otp").get(validateOPT);
router.route("/resentOTP/:email").get(resentOTP);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);
router.route("/password/update").put(isAuthenticated, updatePassword);
// router.route("/me/update").put(isAuthenticated, updateUserProfile);
router.route("/me/update").put(isAuthenticated, updateUserProfile);
router.route("/me/:id").get(isAuthenticated, getUserDetails);
router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRole("admin"), getAllUsers);

router
  .route("/admin/users/:id")
  .get(isAuthenticated, authorizeRole("admin"), getsindleUserByAdmin)
  .put(isAuthenticated, authorizeRole("admin"), updateUserByAdmin)
  .delete(isAuthenticated, authorizeRole("admin"), deleteUserByAdmin);

module.exports = router;