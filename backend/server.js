import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/config.js";
import productsRoutes from "./routes/products.js";
import errorHandler from "./middleware/errorHandle.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";
import cors from "cors"
dotenv.config();

connectDB();

const app = express();

app.use(cors())
app.use(morgan("common"));
app.use(express.json());


app.get("/api", (req, res) => {
  res.json({ message: "server is live" });
});

// endpoint

app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorHandler);

const port = process.env.NODE_PORT || 7000;
app.listen(port, () => {
  console.log(
    `server is live at port ${process.env.NODE_PORT} and in ${process.env.NODE_MODE} mode`
      .bgGreen
  );
});
