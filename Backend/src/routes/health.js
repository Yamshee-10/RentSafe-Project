import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ ok: true, service: "RentSafe Backend", status: "running" });
});

export default router;

