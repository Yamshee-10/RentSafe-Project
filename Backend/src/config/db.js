// Chat gpt code


require('dotenv').config(); // ensure .env is loaded before using process.env

const { Sequelize } = require('sequelize');

const DB_NAME = process.env.MYSQL_DB || process.env.MSQL_DB; // fallback if typo was present
const DB_USER = process.env.MYSQL_USER;
const DB_PASS = process.env.MYSQL_PASSWORD;
const DB_HOST = process.env.MYSQL_HOST || '127.0.0.1';
const DB_PORT = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306;

// quick debug (temporary) - remove or comment out after confirming it works
console.log('DEBUG DB_NAME:', DB_NAME ? 'SET' : 'NOT SET');
console.log('DEBUG DB_USER:', DB_USER ? 'SET' : 'NOT SET');
console.log('DEBUG DB_HOST:', DB_HOST, 'DB_PORT:', DB_PORT);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => console.log('✅ MySQL Connected Successfully'))
  .catch((err) => {
    console.log('❌ MySQL Connection Error:', err.message || err);
    // optional: console.error(err) for full stack
  });

module.exports = sequelize;

















 







// Abhishek's code

// // const mongoose = require('mongoose');

// // src/config/db.js
// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   process.env.MYSQL_DB,             // Database name
//   process.env.MYSQL_USER,          // MySQL username
//   process.env.MYSQL_PASSWORD,      // MySQL password
//   {
//     host: process.env.MYSQL_HOST || "localhost",
//     port: process.env.MYSQL_PORT || 3306,    // <-- added
//     dialect: "mysql",
//     logging: false,                          // <-- hides SQL logs (optional)
//     pool: {                                  // <-- added stability
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//   }
// );

// // Test MySQL connection
// sequelize
//   .authenticate()
//   .then(() => console.log("✅ MySQL Connected Successfully"))
//   .catch((err) => console.log("❌ MySQL Connection Error:", err));

// module.exports = sequelize;








// // const connectDB = async () => {
// //   try {
// //     await mongoose.connect(process.env.MONGO_URI, {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //     });
// //     console.log('MongoDB connected');
// //   } catch (err) {
// //     console.error('MongoDB connection error:', err.message);
// //     process.exit(1);
// //   }
// // };

// // module.exports = connectDB;
