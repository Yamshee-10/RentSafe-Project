const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "user_id",
      },
    },

    razorpay_order_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    razorpay_payment_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    razorpay_signature: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Amount in paise (smallest unit)",
    },

    status: {
      type: DataTypes.ENUM("pending", "success", "failed"),
      allowNull: false,
      defaultValue: "pending",
    },

    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "INR",
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Monthly Subscription",
    },
  },
  {
    tableName: "Payments",
    timestamps: true,
  }
);

module.exports = Payment;
