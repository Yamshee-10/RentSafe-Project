const { Sequelize } = require("sequelize");
const path = require("path");
require("dotenv").config({ 
  path: path.resolve(__dirname, "../.env"),
});

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false, // optional, set to true to see all SQL queries
  }
);

module.exports = sequelize;




















 






