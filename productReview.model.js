const { get } = require("http");
const mongoose = require("mongoose");

const productReviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "buyer",
      required: true,
    },
    rating: {
      type: Number,
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

productReviewSchema.statics = {
  async get(id) {
    try {
      let productReview;
      if (mongoose.Types.ObjectId.isValid(id)) {
        productReview = await this.findById(id).populate("buyer").exec();
      }
      if (productReview) {
        return productReview;
      }

      throw new APIError({
        message: "ProductReview does not exist",
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  async ratingAggregate({ product, status = "enabled" }) {
    try {
      const options = omitBy({ product, status }, isNil);
      let _productReview = [
        {
          rating: 1,
          count: 0,
        },
        {
          rating: 2,
          count: 0,
        },
        {
          rating: 3,
          count: 0,
        },
        {
          rating: 4,
          count: 0,
        },
        {
          rating: 5,
          count: 0,
        },
      ];
      let productReview = await this.find(options);

      for (let i = 0; i < productReview.length; i++) {
        if (Math.floor(productReview[i].rating) == 1) {
          _productReview[0].count = _productReview[0].count + 1;
        } else if (Math.floor(productReview[i].rating) == 2) {
          _productReview[1].count = _productReview[1].count + 1;
        } else if (Math.floor(productReview[i].rating) == 3) {
          _productReview[2].count = _productReview[2].count + 1;
        } else if (Math.floor(productReview[i].rating) == 4) {
          _productReview[3].count = _productReview[3].count + 1;
        } else if (Math.floor(productReview[i].rating) == 5) {
          _productReview[4].count = _productReview[4].count + 1;
        }
      }
      return _productReview;
    } catch (error) {
      throw error;
    }
  },
};
const productReviewModel = mongoose.model("productReview", productReviewSchema);
module.exports = productReviewModel;
