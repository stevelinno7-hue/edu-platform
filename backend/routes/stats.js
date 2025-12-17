import express from "express";
import Question from "../models/Question.js";
import { Answer } from "../models/Answer.js";

const router = express.Router();

/* -----------------------------
   學生答題統計
------------------------------*/

// 1. 每日答題數
router.get("/answers-daily", async (req, res) => {
  const data = await Answer.aggregate([
    {
      $group: {
        _id: { $substr: ["$createdAt", 0, 10] }, // YYYY-MM-DD
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);
  res.json(data);
});

// 2. 平均分數
router.get("/answers-average", async (req, res) => {
  const data = await Answer.aggregate([
    {
      $group: {
        _id: null,
        avgScore: { $avg: "$score" }
      }
    }
  ]);
  res.json(data[0] || { avgScore: 0 });
});

// 3. 錯題率（Top 10）
router.get("/answers-wrong-rate", async (req, res) => {
  const data = await Answer.aggregate([
    { $unwind: "$questions" },
    { $match: { "questions.isCorrect": false } },
    {
      $group: {
        _id: "$questions.questionId",
        question: { $first: "$questions.question" },
        wrongCount: { $sum: 1 }
      }
    },
    { $sort: { wrongCount: -1 } },
    { $limit: 10 }
  ]);
  res.json(data);
});

/* -----------------------------
   題庫統計
------------------------------*/

// 4. 各科目題目數
router.get("/questions-by-subject", async (req, res) => {
  const data = await Question.aggregate([
    { $group: { _id: "$subject", count: { $sum: 1 } } }
  ]);
  res.json(data);
});

// 5. 各年級題目數
router.get("/questions-by-grade", async (req, res) => {
  const data = await Question.aggregate([
    { $group: { _id: "$grade", count: { $sum: 1 } } }
  ]);
  res.json(data);
});

// 6. 各難度題目數
router.get("/questions-by-level", async (req, res) => {
  const data = await Question.aggregate([
    { $group: { _id: "$level", count: { $sum: 1 } } }
  ]);
  res.json(data);
});

// 7. 題庫成長（每月新增題目數）
router.get("/questions-growth", async (req, res) => {
  const data = await Question.aggregate([
    {
      $group: {
        _id: { $substr: ["$createdAt", 0, 7] }, // YYYY-MM
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);
  res.json(data);
});

export default router;
