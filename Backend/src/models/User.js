

// Backend/src/models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // adjust path if needed

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // must match MySQL
    },
    

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    gender: {
      type: DataTypes.STRING,
    },

    age: {
      type: DataTypes.INTEGER,
    },

    address: {
      type: DataTypes.TEXT, // JSON string
      allowNull: false,
    },

    aadhar: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // adding new fileds for the razorpay susbscription
    razorpay_customer_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    razorpay_subscription_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    auto_debit_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    next_billing_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "Users",     // EXACT table name in MySQL
    timestamps: true,       // createdAt & updatedAt
    freezeTableName: true,  // don't pluralize
  }
);
User.removeAttribute('id');



module.exports = User;
