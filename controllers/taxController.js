const Taxes = require("../models/taxesModel");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandlers");

exports.createTax = asyncErrorHandler(async (req, res) => {
  const {
    transactionFee,
    buyFee,
    processingFee,
    sellFee,
    retiredFee,
    tokenwithdrawalFee,
    fiatWithdrawalFee,
    fundingFee,
  } = req.body;

  const tax = await Taxes.create({
    transactionFee,
    buyFee,
    processingFee,
    sellFee,
    retiredFee,
    tokenwithdrawalFee,
    fiatWithdrawalFee,
    fundingFee,
  });

  res.status(200).json({
    success: true,
    tax,
  });
});

exports.getSingleTax = asyncErrorHandler(async (req, res, next) => {
  const tax = await Taxes.findById(req.params.id);

  if (!tax) {
    return next(new ErrorHandler("tax not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    tax,
  });
});

exports.getallTaxes = asyncErrorHandler(async (req, res, next) => {
  const taxes = await Taxes.find();

  res.status(200).json({
    success: true,
    taxes,
  });
});

exports.updateTaxes = asyncErrorHandler(async (req, res, next) => {
  const tax = await Taxes.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!tax) {
    return next(new ErrorHandler("tax not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    tax,
  });
});

exports.deleteTax = asyncErrorHandler(async (req, res, next) => {
  const tax = await Taxes.findById(req.params.id);
  if (!tax) {
    return next(new ErrorHandler("fund not found with this id", 404));
  }
  await tax.remove();
  res.status(200).json({
    success: true,
  });
});
