const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Item = sequelize.define(
  "Item",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    pricePerMonth: {
      type: DataTypes.INTEGER,
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

    image: {
      type: DataTypes.TEXT("long"), // Stores Base64 image or URL
      allowNull: false,
    },
  },
  {
    tableName: "items",
    timestamps: true,
  }
);

module.exports = Item;
