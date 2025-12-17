import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// mockdata 目錄位置
const mockdataPath = path.join(process.cwd(), "mockdata");

// 1. 自動讀取 mockdata 資料夾 → 科目列表
router.get("/subjects", (req, res) => {
  const subjects = fs
    .readdirSync(mockdataPath)
    .filter(name => fs.statSync(path.join(mockdataPath, name)).isDirectory());

  res.json(subjects);
});

// 2. 年級（你未來可以改成動態）
router.get("/grades", (req, res) => {
  res.json(["1", "2", "3", "4", "5", "6"]);
});

// 3. 難度（你未來可以改成動態）
router.get("/levels", (req, res) => {
  res.json(["easy", "medium", "hard"]);
});

export default router;
