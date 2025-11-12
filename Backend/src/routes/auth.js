import express from "express";
import db from "../config/db.js";
const router = express.Router();

router.post("/verify-token", async (req, res) => {
  const { idToken } = req.body || {};
  if (!idToken) {
    return res.status(400).json({ ok: false, message: "idToken required (mock mode)" });
  }

  const user = { id: idToken, email: `${idToken}@example.com`, name: "Verified User" };
  db.getOrCreateUser(user);
  return res.json({ ok: true, user });
});

export default router;
