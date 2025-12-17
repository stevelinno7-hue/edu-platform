import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ["teacher", "student"], default: "student" }
});

export const User = mongoose.model("User", UserSchema);


const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["teacher", "student"], default: "student" }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
