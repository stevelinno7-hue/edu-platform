"use client";

import Card from "@/components/Card";
import Button from "@/components/Button";
import type { Question } from "@/models/Question";
import { useState } from "react";

interface Props {
  question: Question;
  onNext: () => void;
}

export default function StudentQuestionCard({ question, onNext }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSelect = (index: number) => {
    if (showAnswer) return;
    setSelected(index);
    setShowAnswer(true);
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold">{question.title}</h2>

      <div className="mt-6 space-y-3">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.answer;
          const isSelected = i === selected;

          let variant: "muted" | "success" | "danger" = "muted";

          if (showAnswer) {
            if (isCorrect) variant = "success";
            else if (isSelected) variant = "danger";
          }

          return (
            <Button
              key={i}
              variant={variant}
              className="w-full text-left px-4 py-3"
              onClick={() => handleSelect(i)}
            >
              {opt}
            </Button>
          );
        })}
      </div>

      {showAnswer && (
        <Button variant="primary" className="w-full mt-6" onClick={onNext}>
          下一題
        </Button>
      )}
    </Card>
  );
}
