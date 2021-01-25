const mongoose =require('mongoose');

const cartSchema = new mongoose.Schema({
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'buyer',
      required: true,
      unique : true
    },
    addedOn:{
      type : Date,
      default : Date.now()
    },
    product : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity : {
      type : Number,
      default : 0
    },
    price : {
      value : {type : Number, default : 0},
      currency : {type : String, default : "USD"}
    },
    total : {
      type : Number,
      default : 0
    },
    isDeleted: {
      type : Boolean,
      default : false
    }
  }, {
    timestamps: true,
  },{
     usePushEach: true 
  });
  
  module.exports = mongoose.model('Cart', cartSchema);