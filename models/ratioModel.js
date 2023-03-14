const mongoose = require("mongoose");

const ratioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    ratios: [
      {
        ratio: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

ratioSchema.path("ratios").validate(function (ratios) {
  let sum = 0;
  ratios.forEach((ratio) => (sum += ratio.ratio));
  return sum === 100;
}, "The sum of all ratios must be 100.");

// ratioSchema.pre("save", function (next) {
//   const ratios = this.ratios;
//   const sum = ratios.reduce((acc, ratio) => acc + ratio.ratio, 0);
//   if (sum !== 100) {
//     const error = new Error("The sum of all ratios must be 100.");
//     error.status = 404;
//     return next(error);
//   }
//   next();
// });

module.exports = mongoose.model("Ratio", ratioSchema);
