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
    // type: DataTypes.STRING,
    type: DataTypes.DECIMAL(10,2),
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
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

});



module.exports = Product;
