const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandlers");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

function generateUsername(name) {
  const cleanName = name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  var timestamp = Math.floor(new Date().getTime() / 1000);
  const username = cleanName + timestamp;

  return username;
}

exports.registerUser = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userName = await User.findOne({
    userName: email.match(/^([^@]*)@/)[1],
  });

  let uniqueName = email.match(/^([^@]*)@/)[1];

  if (userName?.userName) {
    uniqueName = generateUsername(userName?.userName);
  }

  const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: "profiles",
    width: 150,
    crop: "scale",
  });

  const user = await User.create({
    name,
    userName: uniqueName,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  const token = user.otpGeneration();
  await user.save({ validateBeforeSave: false });

  const message = `your OTP token is :- \n\n ${token} \n\n If you have not requested this OTP then, please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Carbon Project OTP `,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email OPT sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.otpToken = undefined;
    user.optExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email and password", 401));
  }
  const isPasswordMatch = await user.comparePassowrd(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email and password", 401));
  }
  if (!user.verified) {
    const token = user.otpGeneration();
    await user.save({ validateBeforeSave: false });

    const message = `your OTP token is :- \n\n ${token} \n\n If you have not requested this OTP then, please ignore it`;

    try {
      await sendEmail({
        email: user.email,
        subject: `Carbon Porject OTP `,
        message,
      });

      return res.status(200).json({
        success: true,
        message: `you are not Verified!!! OPT sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.otpToken = undefined;
      user.optExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return next(new ErrorHandler(error.message, 500));
    }
  }

  sendToken(user, 200, res);
});

exports.logoutUser = asyncErrorHandler(async (req, res, next) => {
  const option = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };
  res.cookie("token", null, option);
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("user not found"), 404);
  }

  const resetToken = user.resetPassword();
  await user.save({ validateBeforeSave: false });

  const resetPassword = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `your password reset token is :- \n\n ${resetPassword} \n\n If you have not requested this email then, please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "reset password token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

exports.getUserDetails = asyncErrorHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatch = await user.comparePassowrd(req.body.oldPassword);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid old password", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

exports.updateUserProfile = asyncErrorHandler(async (req, res) => {
  const newUserData = {
    name: req.body.name,
    password: req.body.password,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    userFindandModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// exports.updateUserProfile = asyncErrorHandler(async (req, res) => {
//   const newUserData = { name: req.body.name, email: req.body.email };

//   await User.findByIdAndUpdate(req.user.id, newUserData, {
//     new: true,
//     runValidators: true,
//     userFindandModify: false,
//   });

//   res.status(200).json({
//     success: true,
//   });
// });

exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

exports.validateOPT = asyncErrorHandler(async (req, res, next) => {
  const otpToken = req.params.otp;

  const user = await User.findOne({
    otpToken,
    optExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("reset OTP token is invalid or has been expired", 400)
    );
  }

  user.otpToken = undefined;
  user.optExpire = undefined;
  user.verified = true;

  await user.save();
  sendToken(user, 200, res);
});

exports.resentOTP = asyncErrorHandler(async (req, res, next) => {
  const email = req.params.email;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("user not found", 401));
  }
  const token = user.otpGeneration();
  await user.save({ validateBeforeSave: false });

  const message = `your OTP token is :- \n\n ${token} \n\n If you have not requested this OTP then, please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Carbon Project OTP `,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.otpToken = undefined;
    user.optExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.getsindleUserByAdmin = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`user not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUserByAdmin = asyncErrorHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    // email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    userFindandModify: false,
  });

  if (!user) {
    return next(
      new ErrorHandler(`user not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
  });
});

exports.deleteUserByAdmin = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`user not found with id ${req.params.id}`, 404)
    );
  }

  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
