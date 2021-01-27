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
  

  cartSchema.statics = {
    /**
     * Get Cart
     *
     * @param {ObjectId} id - The objectId of course.
     * @returns {Promise<User, APIError>}
     */
    async get(id) {
      try {
        let cart;
        if (mongoose.Types.ObjectId.isValid(id)) {
          cart = await this.findOne({buyer : id}).populate({path : 'product'}).exec();
          if (cart) {
            return cart;
          } else {
            return undefined;
          }
        } else {
          return new APIError({
          message: 'Invalid Buyer Id',
          errors: [{
            field: 'buyerId',
            location: 'params',
            messages: ['Invalid Buyer Id'],
          }],
          status: httpStatus.CONFLICT,
          isPublic: true,
          stack: error.stack,
        });
        }
      } catch (error) {
        console.log("Error",error);
        throw error;
      }
    },
  }  
  module.exports = mongoose.model('Cart', cartSchema);