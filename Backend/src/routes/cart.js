const express = require("express");
const router = express.Router();
const { Cart, Product } = require("../models");
// const Cart = require("../models/Cart");
// const Product = require("../models/Product"); 

// Add to cart
router.post("/", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const existing = await Cart.findOne({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });

    if (existing) {
      return res.json({ message: "Item already in cart" });
    }

    await Cart.create({
      user_id: userId,
      product_id: productId,
    });

    res.json({ message: "Added to cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get cart items

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const items = await Cart.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Product,
        },
      ],
    });

    res.json(items);
  } catch (error) {
    console.error("Cart GET error:", error);
    res.status(500).json({ error: "Server error" });
    console.log(JSON.stringify(items, null, 2));
  }
});
console.log("Product association:", Cart.associations);

// DELETE cart item
router.delete("/:cartId", async (req, res) => {
  try {
    const { cartId } = req.params;

    const deleted = await Cart.destroy({
      where: { id: cartId },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Item removed successfully" });
  } catch (error) {
    console.error("Cart DELETE error:", error);
    res.status(500).json({ error: "Server error" });
  }
});



module.exports = router;



