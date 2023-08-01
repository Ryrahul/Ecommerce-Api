const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      details: {
        type: mongoose.Schema.Types.Mixed,
      },
      totalAmount: { type: Number, required: true },
      paymentStatus: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending",
      },
      shippingAddress: { type: String, required: true },
      Ordered_At: { type: Date, default: Date.now },
    },
  ],
});
const Order = new mongoose.model("Order", orderSchema);
module.exports = Order;
