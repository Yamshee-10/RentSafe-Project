import express from "express";
import db from "../config/db.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/v1/rentals - list user rentals
router.get("/", verifyToken, (req, res) => {
  const rentals = [
    { id: 1, item: "Camera", renter: req.user.email, days: 3, status: "active" },
    { id: 2, item: "Book", renter: req.user.email, days: 5, status: "returned" },
  ];
  res.json({ ok: true, rentals });
  const list = db.getRentalsByUser(req.user.id);
  return res.json({ ok: true, rentals: list });
});

// POST /api/v1/rentals - create a rental (renter requests item)
router.post("/", verifyToken, (req, res) => {
  const { itemId, startDate, endDate } = req.body || {};
  if (!itemId || !startDate || !endDate) return res.status(400).json({ ok: false, message: "itemId, startDate, endDate required" });

  const item = db.getItemById(itemId);
  if (!item) return res.status(404).json({ ok: false, message: "Item not found" });

  const days = Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / (24*60*60*1000)));
  const total = days * (item.pricePerDay || 0);

  const rental = db.createRental({
    itemId: item.id,
    itemTitle: item.title,
    renterId: req.user.id,
    lenderId: item.ownerId,
    startDate,
    endDate,
    days,
    total,
    depositAmount: Math.ceil(total * 0.5) // mock deposit = 50% of total
  });

  return res.json({ ok: true, rental });
});

// POST /api/v1/rentals/:id/confirm - confirm rental (payment or QR)
router.post("/:id/confirm", verifyToken, (req, res) => {
  const rental = db.getRentalById(req.params.id);
  if (!rental) return res.status(404).json({ ok: false, message: "Rental not found" });

  // If the caller is lender or renter, allow confirm
  if (![rental.renterId, rental.lenderId].includes(req.user.id)) {
    return res.status(403).json({ ok: false, message: "Not authorized to confirm this rental" });
  }

  const updated = db.updateRental(rental.id, { status: "confirmed", confirmedAt: new Date().toISOString() });
  return res.json({ ok: true, rental: updated });
});

export default router;
