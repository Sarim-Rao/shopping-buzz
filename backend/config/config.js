import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);

    console.log(
      `Database is connected with host : ${connect.connection.host}`.bgGreen
    );
  } catch (err) {
    console.error(`Unable to connect with database : ${err.message}`.bgRed);
    process.exit(1);
  }
};

export default connectDB;
