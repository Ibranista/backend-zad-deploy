import express, { json, urlencoded } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user-route.js";
import ingredientroutes from "./routes/ingredient-route.js";
import productRouter from "./routes/bakery-productRoute.js";
import posRouter from "./routes/pos-route.js";
import cors from "cors";
const app = express();
const PORT = process.env.port;

connectDB();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
// parse the data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connection setup
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
app.get("/", (req, res) => {
  res.send(`running on port ${PORT}`);
});

// route-middlewares

app.use("/api", userRoutes);
app.use("/ing", ingredientroutes);
app.use("/bakery", productRouter);
app.use("/pos", posRouter);
