const mongoose =require('mongoose')

const tranasactionType=['order_update','payment']
const transactionSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "buyer",
  },
  type: {
    type: String,
    enum : tranasactionType,
    default : 'order_update'
  },
  amount: {
    value: Number,
    currency: { type: String, default: "USD" },
  },
});

const transactionModel = mongoose.model('transsaction',transactionSchema);
module.exports=transactionModel;