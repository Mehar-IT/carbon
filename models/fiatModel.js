const mongoose = require("mongoose");

const fiatSchema = new mongoose.Schema(
  {
    referenceNo: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
  },

  { timestamps: true }
);

fiatSchema.methods.referenceNoGeneration = function () {
  const number = Math.floor(10000 + Math.random() * 9000);
  this.referenceNo = number;
  return number;
};

module.exports = mongoose.model("Fiat", fiatSchema);
