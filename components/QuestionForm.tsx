"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";

interface QuestionFormProps {
  initialData?: {
    title: string;
    options: string[];
    answer: number;
  };
  onSubmit: (data: {
    title: string;
    options: string[];
    answer: number;
  }) => void;
}

export default function QuestionForm({
  initialData,
  onSubmit,
}: QuestionFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [options, setOptions] = useState(
    initialData?.options || ["", "", "", ""]
  );
  const [answer, setAnswer] = useState(initialData?.answer ?? 0);

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ title, options, answer });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="font-medium">題目內容</label>
          <input
            className="w-full border rounded-base px-4 py-2 mt-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="請輸入題目"
          />
        </div>

        <div className="space-y-3">
          <label className="font-medium">選項</label>
          {options.map((opt, i) => (
            <input
              key={i}
              className="w-full border rounded-base px-4 py-2"
              value={opt}
              onChange={(e) => updateOption(i, e.target.value)}
              placeholder={`選項 ${i + 1}`}
            />
          ))}
        </div>

        <div>
          <label className="font-medium">正確答案（選項編號）</label>
          <input
            type="number"
            min="1"
            max="4"
            className="w-full border rounded-base px-4 py-2 mt-2"
            value={answer + 1}
            onChange={(e) => setAnswer(Number(e.target.value) - 1)}
          />
        </div>

        <Button variant="primary" className="w-full">
          儲存題目
        </Button>
      </form>
    </Card>
  );
}
