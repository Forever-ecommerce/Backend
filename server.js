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
app.use(
  cors({
    origin: function(origin, callback) {
      const allowedOrigins = [
        'https://forever-roan.vercel.app',
        'https://forever-git-main-hashim-abdullahs-projects.vercel.app',
        'https://forever-p3f65s9sl-hashim-abdullahs-projects.vercel.app',
        'http://localhost:3000',  // Add your local development port
      ];
      
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

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
