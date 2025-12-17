"use client";

import StudentQuestionCard from "@/components/StudentQuestionCard";
import { usePractice } from "@/hooks/usePractice";
import type { Question } from "@/models/Question";

export default function PracticePage() {
  const questions: Question[] = [
    {
      id: "1",
      title: "下列何者是哺乳類？",
      options: ["鯊魚", "蝙蝠", "章魚", "螃蟹"],
      answer: 1,
    },
    {
      id: "2",
      title: "水的沸點是多少度？",
      options: ["50 度", "80 度", "100 度", "120 度"],
      answer: 2,
    },
  ];

  const { current, isFinished, next } = usePractice(questions);

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">學生練習</h1>

      {!isFinished && (
        <StudentQuestionCard question={current} onNext={next} />
      )}

      {isFinished && (
        <div className="text-center text-2xl font-bold text-primary">
          🎉 恭喜完成所有題目！
        </div>
      )}
    </div>
  );
}
