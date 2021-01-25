
const productReviewSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    comment:{
      type: String,
      required: true,
      trim: true
    },
    product:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    buyer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'buyer',
        required: true,
    },
    rating:{
      type : Number
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