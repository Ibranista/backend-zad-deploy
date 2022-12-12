import mongoose, { model, Schema } from "mongoose";

const bakeryModel = new Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "user",
  },
  productName: {
    type: String,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  productWeight: {
    type: Number,
    required: true,
  },
  totalCalculatedPrice: {
    type: Number,
  },
  expectedProfit: {
    type: Number,
  },
  ingredientLists: [
    {
      type: String,
    },
  ],
});

bakeryModel.pre("save", function () {
  this.totalCalculatedPrice = this.ingredientPrice;
});

const bakeryProduct = model("bakeryproduct", bakeryModel);
export default bakeryProduct;
