import express from "express";
import { randomBytes } from "crypto";
import db from "../config/db.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
POST /api/v1/qr/generate
Body: { rentalId, action } action = "pickup" | "return"
*/
router.post("/generate", verifyToken, (req, res) => {
  const { rentalId, action } = req.body || {};
  if (!rentalId || !action) return res.status(400).json({ ok: false, message: "rentalId and action required" });
  const rental = db.getRentalById(rentalId);
  if (!rental) return res.status(404).json({ ok: false, message: "Rental not found" });

  // token: base62-ish
  const token = randomBytes(8).toString("hex");
  db.createQrToken(token, { rentalId: rental.id, action, createdBy: req.user.id }, 60*60); // 1 hour
  return res.json({ ok: true, token, expiresInSec: 3600 });
});

/*
POST /api/v1/qr/verify
Body: { token }
*/
router.post("/verify", verifyToken, (req, res) => {
  const { token } = req.body || {};
  if (!token) return res.status(400).json({ ok: false, message: "token required" });
  const v = db.verifyQrToken(token);
  if (!v.ok) return res.status(400).json({ ok: false, message: `Invalid token: ${v.reason}` });

  // update rental status
  const { rentalId, action } = v.payload;
  if (action === "pickup") db.updateRental(rentalId, { status: "in_progress", pickedUpAt: new Date().toISOString() });
  else if (action === "return") db.updateRental(rentalId, { status: "returned", returnedAt: new Date().toISOString() });

  return res.json({ ok: true, message: `QR verified, action: ${action}`, rentalId });
});

export default router;
