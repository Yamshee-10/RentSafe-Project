import express from "express";
import db from "../config/db.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

// In production, verify req.user has admin privileges

// POST /api/v1/admin/items
router.post("/items", verifyToken, (req, res) => {
  const { title, description, pricePerDay, category, imageUrl } = req.body || {};
  if (!title || !pricePerDay) return res.status(400).json({ ok: false, message: "title and pricePerDay required" });

  const item = db.createItem({
    title,
    description: description || "",
    pricePerDay: Number(pricePerDay),
    category: category || "general",
    ownerId: req.user.id,
    images: imageUrl ? [imageUrl] : []
  });
  return res.json({ ok: true, item });
});

// PATCH /api/v1/admin/items/:id
router.patch("/items/:id", verifyToken, (req, res) => {
  const updated = db.updateItem(req.params.id, req.body || {});
  if (!updated) return res.status(404).json({ ok: false, message: "Item not found" });
  return res.json({ ok: true, item: updated });
});

export default router;
