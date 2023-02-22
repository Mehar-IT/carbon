const Funds = require("../models/fundsModel");
const User = require("../models/userModel");
const Taxes = require("../models/taxesModel");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandlers");

exports.addFund = asyncErrorHandler(async (req, res) => {
  const Tax = await Taxes.findById("63eb61e32852fd15b2373e39");
  if (!Tax) {
    return next(new ErrorHandler("Tax not found with this id", 404));
  }
  const {
    transactionFee,
    buyFee,
    processingFee,
    sellFee,
    retiredFee,
    tokenwithdrawalFee,
    fiatWithdrawalFee,
    fundingFee,
  } = Tax;
  const { fund: fundAmmount, paymentInfo } = req.body;
  const fund =
    fundAmmount +
    transactionFee +
    buyFee +
    processingFee +
    sellFee +
    retiredFee +
    tokenwithdrawalFee +
    fiatWithdrawalFee +
    fundingFee;
  const fundData = await Funds.create({
    fund,
    paymentInfo,
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    fundData,
  });
});

exports.addFundByAdmin = asyncErrorHandler(async (req, res, next) => {
  const Tax = await Taxes.findById("63eb61e32852fd15b2373e39");

  if (!Tax) {
    return next(new ErrorHandler("Tax not found with this id", 404));
  }

  const {
    transactionFee,
    buyFee,
    processingFee,
    sellFee,
    retiredFee,
    tokenwithdrawalFee,
    fiatWithdrawalFee,
    fundingFee,
  } = Tax;

  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("user not found with this id", 404));
  }

  const { fund: fundAmmount, paymentInfo } = req.body;

  const fund =
    fundAmmount +
    transactionFee +
    buyFee +
    processingFee +
    sellFee +
    retiredFee +
    tokenwithdrawalFee +
    fiatWithdrawalFee +
    fundingFee;

  const fundData = await Funds.create({
    fund,
    transferedBy: req.user._id,
    paymentInfo,
    user: user._id,
  });

  res.status(200).json({
    success: true,
    fundData,
  });
});

exports.getSinglefund = asyncErrorHandler(async (req, res, next) => {
  const fund = await Funds.findById(req.params.id);

  if (!fund) {
    return next(new ErrorHandler("fund not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    fund,
  });
});

exports.getallfunds = asyncErrorHandler(async (req, res, next) => {
  const funds = await Funds.find();

  res.status(200).json({
    success: true,
    funds,
  });
});

exports.myfunds = asyncErrorHandler(async (req, res, next) => {
  const funds = await Funds.find({ user: req.params.userId });

  if (!funds) {
    return next(new ErrorHandler("fund not found with this userId", 404));
  }
  res.status(200).json({
    success: true,
    funds,
  });
});

exports.updateUserFund = asyncErrorHandler(async (req, res, next) => {
  const fund = await Funds.findById(req.params.id);

  if (!fund) {
    return next(new ErrorHandler("fund not found with this id", 404));
  }
  fund.ammount = req.body.ammount;
  await fund.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

exports.deleteUserFund = asyncErrorHandler(async (req, res, next) => {
  const fund = await Funds.findById(req.params.id);

  if (!fund) {
    return next(new ErrorHandler("fund not found with this id", 404));
  }

  await fund.remove();
  res.status(200).json({
    success: true,
  });
});
