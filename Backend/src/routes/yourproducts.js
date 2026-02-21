// GET products lended by a user
router.get("/lent/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const lentProducts = await Product.findAll({
      where: { owner_id: userId }, // adjust if your column name differs
    });

    res.json(lentProducts);
  } catch (error) {
    console.error("Lent products error:", error);
    res.status(500).json({ error: "Server error" });
  }
});
