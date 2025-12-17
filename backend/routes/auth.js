import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";

const router = express.Router();

// 註冊
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashed,
    role
  });

  res.json({ success: true, user });
});

// 登入
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: "User not found" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ error: "Wrong password" });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET
  );

  res.json({
    token,
    role: user.role
  });
});

export default router;
