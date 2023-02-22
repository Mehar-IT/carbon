const Subscription = require("../models/subscriptionModel");
const Plan = require("../models/planModel");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandlers");

exports.addSubscription = asyncErrorHandler(async (req, res, next) => {
  const plan = await Plan.findById(req.query.planID);

  if (!plan) {
    return next(new ErrorHandler("Plan not found with this id", 404));
  }

  const user = await Subscription.findOne({ user: req.user._id });

  const subscribed =
    user && user.subscribed && user.endDate > new Date().getTime();

  if (subscribed) {
    return next(
      new ErrorHandler(
        "You have already subscribed to the plan and you have your limit to use it"
      )
    );
  }

  // const isTrialExpired = user.endDate < new Date().getTime();

  // if (isTrialExpired) {
  //   console.log("trial expired");
  //   user.hasTrial = false;
  //   user.save();
  // }

  const { paymentInfo } = req.body;

  const subscription = await Subscription.create({
    user: req.user._id,
    paymentInfo,
    subscribed: true,
    // hasTrial: plan.trial,
    endDate: plan.endDate,
  });

  res.status(200).json({
    success: true,
    subscription,
  });
});

exports.getSingleSubscription = asyncErrorHandler(async (req, res, next) => {
  const subscription = await Subscription.findById(req.params.id);

  if (!subscription) {
    return next(new ErrorHandler("Subscription not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    subscription,
  });
});

exports.getallSubscriptions = asyncErrorHandler(async (req, res, next) => {
  const subscription = await Subscription.find();

  res.status(200).json({
    success: true,
    subscription,
  });
});

exports.mySubscriptions = asyncErrorHandler(async (req, res, next) => {
  const subscription = await Subscription.find({ user: req.user._id });

  if (!subscription) {
    return next(
      new ErrorHandler("Subscription not found with this userId", 404)
    );
  }
  res.status(200).json({
    success: true,
    subscription,
  });
});

exports.updateUserSubscription = asyncErrorHandler(async (req, res, next) => {
  const subscription = await Subscription.findById(req.params.id);

  if (!subscription) {
    return next(new ErrorHandler("Subscription not found with this id", 404));
  }

  const plan = await Plan.findById(req.query.planID);

  if (!plan) {
    return next(new ErrorHandler("Plan not found with this id", 404));
  }

  // const subscribed =
  //   user && user.subscribed && user.endDate > new Date().getTime();

  // if (subscribed) {
  //   return next(
  //     new ErrorHandler(
  //       "You have already subscribed to the plan and you have your limit to use it"
  //     )
  //   );
  // }
  subscription.paymentInfo = req.body.paymentInfo;
  subscription.endDate = plan.endDate;
  subscription.subscribed = true;

  await subscription.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

exports.deleteUserSubscription = asyncErrorHandler(async (req, res, next) => {
  const subscription = await Subscription.findById(req.params.id);

  if (!subscription) {
    return next(new ErrorHandler("Subscription not found with this id", 404));
  }

  await subscription.remove();
  res.status(200).json({
    success: true,
  });
});
