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
  updateUserPermisionsByAdmin,
} = require("../controllers/userController");
const {
  isAuthenticated,
  authorizeRole,
  authorizeByAdmin,
  authorizePermisions,
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
  .put(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizePermisions,
    updateUserProfile
  );
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
    authorizePermisions,
    getAllUsers
  );

router
  .route("/admin/users/:id")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    getsindleUserByAdmin
  )
  .put(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    updateUserByAdmin
  )
  .delete(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    deleteUserByAdmin
  );
router
  .route("/admin/users/approval/:id")
  .put(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    approveUserByAdmin
  );
router
  .route("/admin/users/updateUserPermisionsByAdmin/:id")
  .put(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    updateUserPermisionsByAdmin
  );
// router.route("/password/update").put(isAuthenticated, updatePassword);
// router.route("/me/updateEmail").put(isAuthenticated, updateEmail);

module.exports = router;
