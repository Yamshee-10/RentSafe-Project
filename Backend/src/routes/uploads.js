import express from "express";
import db from "../config/db.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, (req, res) => {
  const { filename, contentType } = req.body || {};
  if (!filename) return res.status(400).json({ ok: false, message: "filename required" });

  // In prod: generate signed S3 URL. For now: mock URL
  const uploadUrl = `https://mock-s3.example.com/${Date.now()}_${filename}`;
  const record = db.createUpload({ filename, contentType, url: uploadUrl, uploadedBy: req.user.id });
  return res.json({ ok: true, uploadUrl, file: record });
});

export default router;
