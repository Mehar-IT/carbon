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
} = require("../middleware/auth");

router.route("/addFiat").post(isAuthenticated, authorizeByAdmin(true), addFiat);
router
  .route("/getSinglefiat/:id")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    getSingleFiat
  );
router
  .route("/getallfiats")
  .get(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    getallFiats
  );
router
  .route("/getmyfiats")
  .get(isAuthenticated, authorizeByAdmin(true), myFiats);
router
  .route("/updateFiat/:id")
  .put(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    updateFiat
  );
router
  .route("/deleteFiat/:id")
  .delete(
    isAuthenticated,
    authorizeByAdmin(true),
    authorizeRole("admin"),
    deleteFiat
  );

module.exports = router;
