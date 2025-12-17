import express from "express";
import { Question } from "../models/Question.js";
import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";

router.post("/", auth, requireRole("teacher"), async (req, res) => {
  const q = await Question.create(req.body);
  res.json(q);
});

router.put("/:id", auth, requireRole("teacher"), async (req, res) => {
  const q = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(q);
});

router.delete("/:id", auth, requireRole("teacher"), async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

const router = express.Router();

// ✅ 取得所有題目
router.get("/", async (req, res) => {
  const { subject, grade, level, search, page = 1, limit = 20 } = req.query;

  const filter = {};

  if (subject) filter.subject = subject;
  if (grade) filter.grade = grade;
  if (level) filter.level = level;

  if (search) {
    filter.$or = [
      { question: { $regex: search, $options: "i" } },
      { options: { $elemMatch: { $regex: search, $options: "i" } } }
    ];
  }

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Question.find(filter).skip(skip).limit(Number(limit)),
    Question.countDocuments(filter)
  ]);

  res.json({
    items,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit)
  });
  // 🎯 隨機抽題（學生測驗用）
router.get("/random", async (req, res) => {
  const { subject, grade, level, count = 10 } = req.query;

  const filter = {};
  if (subject) filter.subject = subject;
  if (grade) filter.grade = grade;
  if (level) filter.level = level;

  const items = await Question.aggregate([
    { $match: filter },
    { $sample: { size: Number(count) } }
  ]);

  res.json(items);
});

});



export default router;
