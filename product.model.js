const mongoose = require("mongoose");
const { Schema } = mongoose;

const productStatus = ['pending','approved', 'rejected'];

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  minQuantity: {
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
  price: {
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





productSchema.statics = {

    /**
     * Get Course
     *
     * @param {ObjectId} id - The objectId of course.
     * @returns {Promise<User, APIError>}
     */
    async get(id,imageStatus="enabled") {
      try {
        let product;
        if (mongoose.Types.ObjectId.isValid(id)) {
          if(imageStatus == "all"){
            product = await this.findById(id).populate('category').populate('subCategory').populate('productVideos').populate('productPictures').exec();
          } else {
            product = await this.findById(id).populate('category').populate('subCategory')
                                .populate({path : 'productPictures',
                                   match : {status : imageStatus} 
                                  })
                                .populate({path : 'productVideos',
                                   match : {status : imageStatus} 
                                  })
                                .exec();
          }
        }
        if (product) {
          return product;
        }
  
        throw new APIError({
          message: 'Product does not exist',
          status: httpStatus.NOT_FOUND,
        });
      } catch (error) {
        throw error;
      }
    },
  
    /**
     * Return new validation error
     * if error is a mongoose duplicate key error
     *
     * @param {Error} error
     * @returns {Error|APIError}
     */
    checkDuplicateName(error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        return new APIError({
          message: 'Validation Error',
          errors: [{
            field: 'name',
            location: 'body',
            messages: ['name already exists'],
          }],
          status: httpStatus.CONFLICT,
          isPublic: true,
          stack: error.stack,
        });
      }
      return error;
    }
}
const productModel = mongoose.model('product',productSchema);








