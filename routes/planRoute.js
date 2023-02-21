const express = require("express");
const {
  createPlan,
  getSinglePlan,
  getallPlans,
  updatePlan,
  deletePlan,
} = require("../controllers/planController");
const router = express.Router();
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

router
  .route("/createPlan")
  .post(isAuthenticated, authorizeRole("admin"), createPlan);
router
  .route("/getSinglePlan/:id")
  .get(isAuthenticated, authorizeRole("admin"), getSinglePlan);
router
  .route("/getallPlans")
  .get(isAuthenticated, authorizeRole("admin"), getallPlans);
router
  .route("/updatePlan/:id")
  .put(isAuthenticated, authorizeRole("admin"), updatePlan);
router
  .route("/deletePlan/:id")
  .delete(isAuthenticated, authorizeRole("admin"), deletePlan);

module.exports = router;
