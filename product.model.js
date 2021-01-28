const mongoose = require("mongoose");
const { Schema } = mongoose;



const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  subImage: {
    type: Object,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  currencyType: {
    type: String,
    required: true,
  },
  productAvailability: {
    type: Boolean,
    default: true,
  },
  discount:{

    type: Number,
  },
  brand:{

    type:String,
    required:true,
  },
  product_id:{

      type:String,
      required:true,
  },
  category:{

      type:String,
      required:true,
  },
});


//filtered by category
productSchema.methods.findSimilarCategory =  (category,cb)=> {
  return this.model('product').find({ category: category }, cb);
};

//offer product
productSchema.methods.findSimilarDiscount =  (cb)=> {
  return this.model('product').find({ discount: {$gt:40} }, cb);
};

//filter by price
productSchema.methods.filterByPrice =  (price,cb)=> {
  return this.model('product').find({ discount: {$lt:price} }, cb);
};

const productModel = mongoose.model('product',productSchema);








