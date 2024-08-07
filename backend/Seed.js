import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/config.js";
import products from "./Data/Products.js";
import user from "./Data/User.js";
import productsModel from "./Models/productsModel.js";
import userModel from "./Models/userModel.js";

dotenv.config();

connectDB();

const seedData = async () => {
  try {
    const savedUsers = await userModel.insertMany(user);
    const adminUserID = savedUsers[0]._id;

    const updateProducts = products.map((product) => {
      return {
        ...product,
        user: adminUserID.toString(),
      };
    });

    await productsModel.insertMany(updateProducts);

    console.log(`Data inserted`.bgGreen);
    process.exit(0);
  } catch (err) {
    console.log(`error occur ${err.message}`.bgRed);
    process.exit(1);
  }
};

// delete data

const DeleteData = async () => {
  try {
    await productsModel.deleteMany({});
    await userModel.deleteMany({});

    console.log(`data deleted`.bgGreen);
    process.exit(0);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  DeleteData();
} else {
  seedData();
}
