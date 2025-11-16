// const mongoose = require('mongoose');

// src/config/db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DB,            // Database name
  process.env.MYSQL_USER,          // MySQL username
  process.env.MYSQL_PASSWORD,      // MySQL password
  {
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || 3306,    // <-- added
    dialect: "mysql",
    logging: false,                          // <-- hides SQL logs (optional)
    pool: {                                  // <-- added stability
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Test MySQL connection
sequelize
  .authenticate()
  .then(() => console.log("✅ MySQL Connected Successfully"))
  .catch((err) => console.log("❌ MySQL Connection Error:", err));

module.exports = sequelize;








// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error('MongoDB connection error:', err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
