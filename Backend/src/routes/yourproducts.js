// // GET products lended by a user
const { Product, User } = require("../models");

router.get("/lent/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const lentProducts = await Product.findAll({
      where: { userId: userId },
      include: [
        {
          model: User,
          as: "User",
          attributes: ["user_id", "name"],
        },
      ],
    });

    res.json(lentProducts);
  } catch (error) {
    console.error("Lent products error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// router.get("/lent/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const lentProducts = await Product.findAll({
//       where: { owner_id: userId }, // adjust if your column name differs
//     });

//     res.json(lentProducts);
//   } catch (error) {
//     console.error("Lent products error:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });
