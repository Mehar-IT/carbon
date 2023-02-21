const Subscription = require("../models/subscriptionModel");
const ErrorHandler = require("../utils/errorHandlers");
const asyncErrorHandler = require("./asyncErrorHandler");

exports.hasSubscription = asyncErrorHandler(async (req, res, next) => {
  const user = await Subscription.findOne({ user: req.user._id });
  const subscribed =
    user && user.subscribed && user.endDate > new Date().getTime();

  console.log(subscribed);

  if (!subscribed) {
    return next(new ErrorHandler("you have not subscribed yet"));
  }
  next();
});
