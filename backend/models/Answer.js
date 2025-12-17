import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // 之後可改成 ObjectId
    subject: String,
    grade: String,
    level: String,

    // 學生作答的題目
    questions: [
      {
        questionId: String,
        question: String,
        options: [String],
        correctAnswer: String,
        studentAnswer: String,
        isCorrect: Boolean
      }
    ],

    score: Number, // 答對題數
    total: Number  // 題目總數
  },
  { timestamps: true }
);

export const Answer = mongoose.model("Answer", AnswerSchema);
