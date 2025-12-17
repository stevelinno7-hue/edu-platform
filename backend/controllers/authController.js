import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function register(req, res) {
  try {
    const { email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email 已被註冊" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashed,
      role
    });

    res.json({ message: "註冊成功", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: "註冊失敗" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "帳號或密碼錯誤" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "帳號或密碼錯誤" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "登入失敗" });
  }
}
