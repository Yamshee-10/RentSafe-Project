import express from "express";
import db from "../config/db.js";
import { randomUUID } from "crypto";
const router = express.Router();

/*
POST /api/v1/checkout/create-session
Body: { rentalId }  (rental created already)
This mock returns a fake session id and marks the rental as "payment_pending".
Real integration: create Stripe Checkout session and handle webhook.
*/
router.post("/create-session", async (req, res) => {
  const { rentalId } = req.body || {};
  if (!rentalId) return res.status(400).json({ ok: false, message: "rentalId required" });

  const rental = db.getRentalById(rentalId);
  if (!rental) return res.status(404).json({ ok: false, message: "Rental not found" });

  const sessionId = `cs_${randomUUID()}`;
  // update rental status
  db.updateRental(rentalId, { status: "payment_pending", sessionId });
  return res.json({ ok: true, sessionId });
});

export default router;
