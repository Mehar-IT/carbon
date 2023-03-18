const express = require("express");
const {
  createTax,
  getSingleTax,
  getallTaxes,
  updateTaxes,
  deleteTax,
} = require("../controllers/taxController");
const router = express.Router();
const {
  isAuthenticated,
  authorizeRole,
  authorizeByAdmin,
} = require("../middleware/auth");

router
  .route("/createTax")
  .post(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    createTax
  );
router
  .route("/getSingleTax/:id")
  .get(isAuthenticated, authorizeByAdmin(true), getSingleTax);
router
  .route("/getAllTaxes")
  .get(isAuthenticated, authorizeByAdmin(true), getallTaxes);

router
  .route("/updateTax/:id")
  .put(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    updateTaxes
  );
router
  .route("/deleteTax/:id")
  .delete(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    deleteTax
  );

module.exports = router;
