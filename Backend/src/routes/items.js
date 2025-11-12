import express from "express";
import db from "../config/db.js";
const router = express.Router();

const mockItems = [
  { id: 1, title: "DSLR Camera", pricePerDay: 300, available: true },
  { id: 2, title: "Camping Tent", pricePerDay: 150, available: true },
  { id: 3, title: "MacBook Air", pricePerDay: 500, available: false },
];

// GET /api/v1/items?page=1&limit=10&q=keyword&category=...
router.get("/", (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const filter = { q: req.query.q || undefined, category: req.query.category || undefined };
  const result = db.listItems({ page, limit, filter });
  return res.json({ ok: true, ...result });
});

// GET /api/v1/items/:id
router.get("/:id", (req, res) => {
  const item = db.getItemById(req.params.id);
  if (!item) return res.status(404).json({ ok: false, message: "Item not found" });
  return res.json({ ok: true, item });
});

export default router;
