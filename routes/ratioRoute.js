const express = require("express");
const {
  createRatio,
  getAllRatio,
  updateRatio,
  getSingleRatio,
  deleteRatio,
} = require("../controllers/ratioController");
const router = express.Router();
const {
  isAuthenticated,
  authorizeRole,
  authorizeByAdmin,
} = require("../middleware/auth");

router
  .route("/createRatio")
  .post(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    createRatio
  );
router
  .route("/getAllRatio")
  .get(isAuthenticated, authorizeByAdmin(true), getAllRatio);
router
  .route("/updateRatio/:id")
  .put(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    updateRatio
  );
router
  .route("/getSingleRatio/:id")
  .get(isAuthenticated, authorizeByAdmin(true), getSingleRatio);
router
  .route("/deleteRatio/:id")
  .delete(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    deleteRatio
  );

module.exports = router;
