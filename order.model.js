const mongoose = require('mongoose');
const orderStatus = [
  "pending",
  "confirmed",
  "shipped",
  "shipping",
  "delivered",
  "rejected",
  "cancelled",
];
/**
 * order Schema
 * @private
 */
const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "buyer",
      required: true,
    },
    product:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      quantity:Number,
    }],
    status: {
      type: String,
      enum: orderStatus,
      default: "pending",
    },
    quantity: {
      type: Number,
      default: 0,
    },
    price: {
      value: { type: Number, default: 0 },
      currency: { type: String, default: "USD" },
    },
    deliveryCharges: {
      value: { type: Number, default: 0 },
      currency: { type: String, default: "USD" },
    },
    total: {
      type: Number,
      default: 0,
    },
    grandTotal: {
      value: { type: Number, default: 0 },
      currency: { type: String, default: "USD" },
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
    shippingAddress: {
      contactName: String,
      zipCode: String,
      house: String,
      street: String,
      city: String,
      state: String,
      country: String,
      Landmark: String,
      phone: String,
    }
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("order", orderSchema);
