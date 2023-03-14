const express = require("express");
const {
  createRatio,
  getAllRatio,
  updateRatio,
  getSingleRatio,
  deleteRatio,
} = require("../controllers/ratioController");
const router = express.Router();
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

router
  .route("/createRatio")
  .post(isAuthenticated, authorizeRole("admin"), createRatio);
router.route("/getAllRatio").get(isAuthenticated, getAllRatio);
router
  .route("/updateRatio/:id")
  .put(isAuthenticated, authorizeRole("admin"), updateRatio);
router.route("/getSingleRatio/:id").get(isAuthenticated, getSingleRatio);
router
  .route("/deleteRatio/:id")
  .delete(isAuthenticated, authorizeRole("admin"), deleteRatio);

module.exports = router;
