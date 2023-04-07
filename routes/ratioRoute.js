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
  authorizePermisions,
} = require("../middleware/auth");

router
  .route("/createRatio")
  .post(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    createRatio
  );
router
  .route("/getAllRatio")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizePermisions,
    getAllRatio
  );
router
  .route("/updateRatio/:id")
  .put(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    updateRatio
  );
router
  .route("/getSingleRatio/:id")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizePermisions,
    getSingleRatio
  );
router
  .route("/deleteRatio/:id")
  .delete(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    deleteRatio
  );

module.exports = router;
