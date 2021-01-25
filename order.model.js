const mongoose = require('mongoose');
const orderStatus = [
  "pending",
  "confirmed",
  "payment_pending",
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
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
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
    shippingCharges: {
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
    isPaid: {
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
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
  {
    usePushEach: true,
  }
);

/**
 * Statics
 */

/**
 * @typedef order
 */
module.exports = mongoose.model("order", orderSchema);
