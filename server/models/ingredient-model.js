import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const ingredientSchema = new Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "user",
    },
    ingredientName: {
      type: String,
      required: true,
    },
    ingredientPrice: {
      type: Number,
      required: true,
    },
    ingredientWeight: {
      type: Number,
      required: true,
    },
    deliveryPayment: {
      type: Number,
      required: true,
    },
    TotalcalculatedPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
ingredientSchema.pre("save", function () {
  this.TotalcalculatedPrice = this.ingredientPrice + this.deliveryPayment;
});

const Ingredient = model("ingredient", ingredientSchema);
export default Ingredient;
