const mongoose = require("mongoose");

const taxSchema = new mongoose.Schema(
  {
    transactionFee: {
      type: Number,
      default: 0,
      required: true,
    },
    buyFee: {
      type: Number,
      default: 0,
      required: true,
    },
    processingFee: {
      type: Number,
      default: 0,
      required: true,
    },
    sellFee: {
      type: Number,
      default: 0,
      required: true,
    },
    retiredFee: {
      type: Number,
      default: 0,
      required: true,
    },
    tokenwithdrawalFee: {
      type: Number,
      default: 0,
      required: true,
    },
    fiatWithdrawalFee: {
      type: Number,
      default: 0,
      required: true,
    },
    fundingFee: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Taxes", taxSchema);
