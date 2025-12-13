// //Temporarily skip DB connection
// Backend/src/server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth");
const app = express();

// Correct static folder for uploads (only ONE line)
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
// TEMP: Disable MySQL (so no crash)
console.log("⚠️ MySQL temporarily disabled — using JSON storage only");

// Routes
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});








// Backend/src/server.js

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const app = express();
// app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// // app.use("/uploads", express.static("uploads"));


// // Middlewares
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve uploads folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // TEMP: Disable MySQL (so no crash)
// console.log("⚠️ MySQL temporarily disabled — using JSON storage only");

// // Routes
// const productRoutes = require("./routes/products");
// app.use("/api/products", productRoutes);

// // Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });









