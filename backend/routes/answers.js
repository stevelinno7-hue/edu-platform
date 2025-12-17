import express from "express";
import { Answer } from "../models/Answer.js";
import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";

router.post("/", auth, requireRole("student"), async (req, res) => {
  const answer = await Answer.create(req.body);
  res.json({ success: true, answer });
});


const router = express.Router();

// 儲存學生答題紀錄
router.post("/", async (req, res) => {
  const data = req.body;

  const answer = await Answer.create(data);

  res.json({ success: true, answer });
});

export default router;
