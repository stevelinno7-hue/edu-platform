import mongoose from "mongoose";

const MONGO_URL =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/questions";

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err);
    process.exit(1);
  }
}

connectDB(); // ← 這行非常重要
