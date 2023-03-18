const express = require("express");
const {
  createPlan,
  getSinglePlan,
  getallPlans,
  updatePlan,
  deletePlan,
} = require("../controllers/planController");
const router = express.Router();
const {
  isAuthenticated,
  authorizeRole,
  authorizeByAdmin,
} = require("../middleware/auth");

router
  .route("/createPlan")
  .post(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    createPlan
  );
router
  .route("/getSinglePlan/:id")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    getSinglePlan
  );
router
  .route("/getallPlans")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    getallPlans
  );
router
  .route("/updatePlan/:id")
  .put(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    updatePlan
  );
router
  .route("/deletePlan/:id")
  .delete(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    deletePlan
  );

module.exports = router;
