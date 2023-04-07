const express = require("express");
const {
  addFiat,
  getSingleFiat,
  getallFiats,
  myFiats,
  deleteFiat,
  updateFiat,
} = require("../controllers/fiatController");
const router = express.Router();
const {
  isAuthenticated,
  authorizeRole,
  authorizeByAdmin,
  authorizePermisions,
} = require("../middleware/auth");

router
  .route("/addFiat")
  .post(isAuthenticated, authorizeByAdmin(true), authorizePermisions, addFiat);
router
  .route("/getSinglefiat/:id")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    getSingleFiat
  );
router
  .route("/getallfiats")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    getallFiats
  );
router
  .route("/getmyfiats")
  .get(isAuthenticated, authorizeByAdmin(true), authorizePermisions, myFiats);
router
  .route("/updateFiat/:id")
  .put(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    updateFiat
  );
router
  .route("/deleteFiat/:id")
  .delete(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    authorizePermisions,
    deleteFiat
  );

module.exports = router;
