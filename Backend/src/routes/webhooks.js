import express from "express";
const router = express.Router();

router.post("/stripe", express.raw({ type: "*/*" }), (req, res) => {
  // In production: verify signature with STRIPE_WEBHOOK_SECRET
  console.log("Webhook received:", req.headers['stripe-signature'] || "(no sig)");

  res.status(200).send("ok");
});

export default router;
