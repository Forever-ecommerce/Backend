import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/miongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

//App Config

const app = express();
const port = 4000;
connectDB();
// connectCloudinary();

//Middlewares

app.use(express.json());
app.use(cors({ origin: ['https://forever-git-main-hashim-abdullahs-projects.vercel.app'] }));

//API endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`Server is running on PORT : ${port}`);
});
