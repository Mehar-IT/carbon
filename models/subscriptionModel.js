const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      // required: true,
      default: "sdsadsad",
    },
    status: {
      type: String,
      // required: true,
      default: "asdsadsad",
    },
  },
  subscribed: {
    type: String,
    default: false,
  },
  endDate: { type: Date, default: null },
  // hasTrial: { type: Boolean, default: false },
});

const userModel = mongoose.model("Subscription", subscriptionSchema);

module.exports = userModel;
