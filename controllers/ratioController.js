const Ratio = require("../models/ratioModel");
const User = require("../models/userModel");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandlers");

exports.createRatio = asyncErrorHandler(async (req, res, next) => {
  const { ratios } = req.body;
  const ratio = await Ratio({
    user: req.user._id,
    ratios,
  });

  await ratio.save();
  res.status(200).json({
    success: true,
    ratio,
  });
});

exports.getAllRatio = asyncErrorHandler(async (req, res, next) => {
  const ratio = await Ratio.find();

  res.status(200).json({
    success: true,
    ratio,
  });
});

exports.updateRatio = asyncErrorHandler(async (req, res, next) => {
  const { ratios } = req.body;
  const { id } = req.params;
  const ratio = await Ratio.findByIdAndUpdate(
    id,
    { ratios },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  if (!ratio) {
    return next(new ErrorHandler("Ratios not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    ratio,
  });
});

exports.deleteRatio = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const ratio = await Ratio.findById(id);

  if (!ratio) {
    return next(new ErrorHandler("Ratios not found with this id", 404));
  }

  await ratio.delete();
  res.status(200).json({
    success: true,
  });
});

exports.getSingleRatio = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const ratio = await Ratio.findById(id);

  if (!ratio) {
    return next(new ErrorHandler("Ratios not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    ratio,
  });
});
