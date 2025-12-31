
// Backend/src/server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const sequelize = require("./config/db"); // ✅ ENABLE MYSQL
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

const app = express();

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Start server ONLY if MySQL works
const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    console.log("✅ MySQL enabled & connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MySQL connection failed:", err.message);
    process.exit(1);
  });


















// <<<<<<< Updated upstream
// // // //Temporarily skip DB connection
// // // Backend/src/server.js
// =======
// // //Temporarily skip DB connection
// // Backend/src/server.js

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const authRoutes = require("./routes/auth");
// const app = express();

// // Correct static folder for uploads (only ONE line)
// app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// // Middlewares
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/api/auth", authRoutes);
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
// >>>>>>> Stashed changes

// // require("dotenv").config();
// // const express = require("express");
// // const cors = require("cors");
// // const path = require("path");
// <<<<<<< Updated upstream
// // const authRoutes = require("./routes/auth");
// // const sequelize = require("./config/db");

// // const app = express();

// // // Correct static folder for uploads (only ONE line)
// =======

// // // ✅ IMPORT DB (THIS ENABLES MYSQL)
// // const sequelize = require("./config/db");

// // const authRoutes = require("./routes/auth");
// // const productRoutes = require("./routes/products");

// // const app = express();

// // // Static uploads
// >>>>>>> Stashed changes
// // app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// // // Middlewares
// // app.use(cors());
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// <<<<<<< Updated upstream
// // app.use("/api/auth", authRoutes);
// // // TEMP: Disable MySQL (so no crash)
// // console.log("⚠️ MySQL temporarily disabled — using JSON storage only");
// =======
// >>>>>>> Stashed changes

// // // Routes
// // app.use("/api/auth", authRoutes);
// // app.use("/api/products", productRoutes);

// // // ✅ Sync DB (creates tables automatically later)
// // sequelize.sync({ alter: true })
// //   .then(() => console.log("✅Database synced"))
// //   .catch(err => console.error(" DB Sync Error:", err));

// // // Server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(` Server running on port ${PORT}`);
// // });







// <<<<<<< Updated upstream

// // // Backend/src/server.js

// // // require("dotenv").config();
// // // const express = require("express");
// // // const cors = require("cors");
// // // const path = require("path");
// // // const app = express();
// // // app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// // // // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// // // // app.use("/uploads", express.static("uploads"));


// // // // Middlewares
// // // app.use(cors());
// // // app.use(express.json());
// // // app.use(express.urlencoded({ extended: true }));

// // // // Serve uploads folder
// // // app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // // // TEMP: Disable MySQL (so no crash)
// // // console.log("⚠️ MySQL temporarily disabled — using JSON storage only");

// // // // Routes
// // // const productRoutes = require("./routes/products");
// // // app.use("/api/products", productRoutes);

// // // // Server
// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => {
// // //   console.log(`Server running on port ${PORT}`);
// // // });


// // Chatgpt code

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path");

// const sequelize = require("./config/db"); // ✅ ENABLE MYSQL
// const authRoutes = require("./routes/auth");
// const productRoutes = require("./routes/products");

// const app = express();

// // Static uploads folder
// app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// // Middlewares
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);

// // Start server ONLY if MySQL works
// const PORT = process.env.PORT || 5000;

// sequelize
//   .sync()
//   .then(() => {
//     console.log("✅ MySQL enabled & connected");
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MySQL connection failed:", err.message);
//     process.exit(1);
//   });








// =======
// >>>>>>> Stashed changes
