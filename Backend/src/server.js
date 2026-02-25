
// Backend/src/server.js
// require('dotenv').config();
require("dotenv").config({ override: true });
console.log("DB HOST:", process.env.DB_HOST);
console.log("DB NAME:", process.env.DB_NAME);

const path = require("path");
const express = require("express");
const cors = require("cors");
const session = require("express-session");


const SequelizeStore = require("connect-session-sequelize")(session.Store);
// const sequelize = require("./config/db");
const { sequelize, Cart, Product,User } = require("./models");
 //  ONE sequelize only
// require("./models/User");
// require("./models/Product");
// require("./models/Cart");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");



const app = express();

/* =======================
   MIDDLEWARES
======================= */
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

/* =======================
   SESSION SETUP (MYSQL)
======================= */
const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    name: "rentsafe.sid",
    secret: "rentsafe_secret_key",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // true only in production (https)
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

/* =======================
   ROUTES
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
/* =======================
   START SERVER
======================= */
const PORT = process.env.PORT || 5000;
sequelize
  .sync()
  .then(() => {
    sessionStore.sync(); //  creates Sessions table
    console.log(" MySQL & Session store connected");

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Database connection failed:", err);
  });