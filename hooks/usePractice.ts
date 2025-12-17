import { useState } from "react";
import type { Question } from "@/models/Question";

export function usePractice(questions: Question[]) {
  const [index, setIndex] = useState(0);

  const current = questions[index];
  const isFinished = index >= questions.length;

  const next = () => {
    setIndex((i) => i + 1);
  };

  return {
    current,
    isFinished,
    next,
  };
}
