import { model, Schema } from "mongoose";

export const userModel = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ["manager", "financeManager"],
    },
    password: {
      type: String,
      min: [6, "Too short"],
      max: 12,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("user", userModel);
export default User;
