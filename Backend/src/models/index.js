const sequelize = require("../config/db");
const Cart = require("./Cart");
const Product = require("./Product");
const User = require("./User");

// ASSOCIATIONS
Cart.belongsTo(Product, { foreignKey: "product_id" });
Product.hasMany(Cart, { foreignKey: "product_id" });

// Product.belongsTo(User, { foreignKey: "user_id", targetKey: 'user_id' });
// User.hasMany(Product, { foreignKey: "user_id" });
Product.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "user_id",
  as: "User"
});

User.hasMany(Product, {
  foreignKey: "user_id",
  sourceKey: "user_id"
});
module.exports = {
  sequelize,
  Cart,
  Product,
  User
};


