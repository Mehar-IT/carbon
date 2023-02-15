const mongoose = require("mongoose");

const fundSchema = new mongoose.Schema(
  {
    transferedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: null,
      // required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    fund: {
      type: Number,
      default: 0,
      required: true,
    },
    paymentInfo: {
      id: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Funds", fundSchema);
