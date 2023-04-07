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
  authorizePermisions,
} = require("../middleware/auth");

router
  .route("/createTax")
  .post(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    createTax
  );
router
  .route("/getSingleTax/:id")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizePermisions,
    getSingleTax
  );
router
  .route("/getAllTaxes")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizePermisions,
    getallTaxes
  );

router
  .route("/updateTax/:id")
  .put(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    updateTaxes
  );
router
  .route("/deleteTax/:id")
  .delete(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    deleteTax
  );

module.exports = router;
