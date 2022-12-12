import { connect } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const connection = await connect(process.env.MONGO_URI);
    console.log(`hostName:${connection.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
