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
  authorizePermisions,
} = require("../middleware/auth");

router
  .route("/createPlan")
  .post(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    createPlan
  );
router
  .route("/getSinglePlan/:id")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    getSinglePlan
  );
router
  .route("/getallPlans")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    getallPlans
  );
router
  .route("/updatePlan/:id")
  .put(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    updatePlan
  );
router
  .route("/deletePlan/:id")
  .delete(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    deletePlan
  );

module.exports = router;
