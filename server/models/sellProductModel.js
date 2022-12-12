import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const pointOfSell = new Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "user",
    },
    productName: {
      type: String,
      required: true,
    },
    itemsSold: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Pos = model("pos", pointOfSell);
export default Pos;
