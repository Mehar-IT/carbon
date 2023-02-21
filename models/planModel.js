const mongoose = require("mongoose");

const planScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    features: {
      type: Array,
      required: true,
    },
    // trial: { type: Boolean, default: false },
    endDate: { type: Date, default: null },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Plan", planScheme);
