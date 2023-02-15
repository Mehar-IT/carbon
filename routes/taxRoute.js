const express = require("express");
const {
  createTax,
  getSingleTax,
  getallTaxes,
  updateTaxes,
  deleteTax,
} = require("../controllers/taxController");
const router = express.Router();
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

router
  .route("/createTax")
  .post(isAuthenticated, authorizeRole("admin"), createTax);
router.route("/getSingleTax/:id").get(isAuthenticated, getSingleTax);
router.route("/getAllTaxes").get(isAuthenticated, getallTaxes);

router
  .route("/updateTax/:id")
  .put(isAuthenticated, authorizeRole("admin"), updateTaxes);
router
  .route("/deleteTax/:id")
  .delete(isAuthenticated, authorizeRole("admin"), deleteTax);

module.exports = router;
