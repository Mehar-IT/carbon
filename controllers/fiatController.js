const Fiats = require("../models/fiatModel");
const User = require("../models/userModel");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandlers");

exports.addFiat = asyncErrorHandler(async (req, res) => {
  const { amount } = req.body;

  let fiatData = await Fiats({
    amount,
    user: req.user._id,
  });
  fiatData.referenceNoGeneration();
  fiatData = await fiatData.save({ validateBeforeSave: true });
  await fiatData.populate("user", "firstName lastName userName emails.email");

  res.status(200).json({
    success: true,
    fiatData,
  });
});

exports.getSingleFiat = asyncErrorHandler(async (req, res, next) => {
  const fiat = await Fiats.findById(req.params.id);

  if (!fiat) {
    return next(new ErrorHandler("fiat not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    fiat,
  });
});

exports.getallFiats = asyncErrorHandler(async (req, res, next) => {
  const fiats = await Fiats.find();

  res.status(200).json({
    success: true,
    fiats,
  });
});

exports.myFiats = asyncErrorHandler(async (req, res, next) => {
  const fiat = await Fiats.find({ user: req.user._id });

  if (!fiat) {
    return next(new ErrorHandler("fiat not found with this userId", 404));
  }
  res.status(200).json({
    success: true,
    fiat,
  });
});

exports.updateFiat = asyncErrorHandler(async (req, res, next) => {
  const fiat = await Fiats.findById(req.params.id);

  if (!fiat) {
    return next(new ErrorHandler("fund not found with this id", 404));
  }
  const { amount, status } = req.body;
  //   fiat.amount = amount;
  fiat.status = status;

  await fiat.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

exports.deleteFiat = asyncErrorHandler(async (req, res, next) => {
  const fiat = await Fiats.findById(req.params.id);

  if (!fiat) {
    return next(new ErrorHandler("fiat not found with this id", 404));
  }

  await fiat.remove();
  res.status(200).json({
    success: true,
  });
});
