const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
console.log("Cart model loaded");
const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
const Product = require("./Product");



module.exports = Cart;
