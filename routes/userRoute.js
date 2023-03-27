const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  // updatePassword,
  // updateEmail,
  updateUserProfile,
  getAllUsers,
  validateOTP,
  resentOTP,
  getsindleUserByAdmin,
  updateUserByAdmin,
  deleteUserByAdmin,
  approveUserByAdmin,
} = require("../controllers/userController");
const {
  isAuthenticated,
  authorizeRole,
  authorizeByAdmin,
} = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/validateOTP").post(validateOTP);
router.route("/resentOTP/:email").post(resentOTP);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);
router
  .route("/me/update")
  .put(isAuthenticated, authorizeByAdmin(true), updateUserProfile);
router.route("/me/").get(isAuthenticated, getUserDetails);
// router
//   .route("/me/")
//   .get(isAuthenticated, authorizeByAdmin(true), getUserDetails);
router
  .route("/admin/users")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    getAllUsers
  );

router
  .route("/admin/users/:id")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    getsindleUserByAdmin
  )
  .put(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    updateUserByAdmin
  )
  .delete(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    deleteUserByAdmin
  );
router
  .route("/admin/users/approval/:id")
  .put(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    approveUserByAdmin
  );
// router.route("/password/update").put(isAuthenticated, updatePassword);
// router.route("/me/updateEmail").put(isAuthenticated, updateEmail);

module.exports = router;
