const Plan = require("../models/planModel");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const ErrorHandler = require("../utils/errorhandlers");

exports.createPlan = asyncErrorHandler(async (req, res) => {
  const { name, price, features, endDate } = req.body;

  const ms = new Date().getTime() + 1000 * 60 * 60 * 24 * endDate;
  const n = new Date(ms);

  const plan = await Plan.create({
    name,
    price,
    features,
    endDate: n,
    // trial,
  });

  res.status(200).json({
    success: true,
    plan,
  });
});

exports.getSinglePlan = asyncErrorHandler(async (req, res, next) => {
  const plan = await Plan.findById(req.params.id);

  if (!plan) {
    return next(new ErrorHandler("Plan not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    plan,
  });
});

exports.getallPlans = asyncErrorHandler(async (req, res, next) => {
  const plans = await Plan.find();

  res.status(200).json({
    success: true,
    plans,
  });
});

exports.updatePlan = asyncErrorHandler(async (req, res, next) => {
  const plan = await Plan.findById(req.params.id);

  if (!plan) {
    return next(new ErrorHandler("Plan not found with this id", 404));
  }

  const ms = new Date().getTime() + 1000 * 60 * 60 * 24 * req.body.endDate;
  const n = new Date(ms);

  plan.name = req.body.name;
  plan.price = req.body.price;
  plan.features = req.body.features;
  // plan.trial = req.body.trial;
  plan.endDate = n;

  await fund.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

exports.deletePlan = asyncErrorHandler(async (req, res, next) => {
  const plan = await Plan.findById(req.params.id);

  if (!plan) {
    return next(new ErrorHandler("Plan not found with this id", 404));
  }

  await plan.remove();
  res.status(200).json({
    success: true,
  });
});
