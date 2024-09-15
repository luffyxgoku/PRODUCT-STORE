import express from "express";
import dotenv from "dotenv";
import path from "path";
import session from "express-session"; // Add express-session
import { connectDB } from "./config/db.js";

dotenv.config();

import productRoutes from "./routes/Product.js";
import userRoutes from "./routes/User.js";

const app = express();
const PORT = process.env.PORT || 9940;

const __dirname = path.resolve();

// Setup session management
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret", // Store your secret in .env
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 * 60 }, // Set secure to true if using HTTPS
  })
);

app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/Frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});

// new pass for new project in mongodb named ProductStore - YfS6ldPorXsFL4Iz
// connection string for ProductStore project - mongodb+srv://kinghunz12:<db_password>@cluster0.h0bzb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
