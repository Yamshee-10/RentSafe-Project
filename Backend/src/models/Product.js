const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  priceRange: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  minRentalPeriod: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Product;
