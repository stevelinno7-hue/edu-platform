// components/QuestionForm.tsx
"use client";

import { useState, useEffect } from "react";
import type { Question } from "@/models/Question";
import Button from "@/components/Button";
import Card from "@/components/Card";

interface Props {
  mode: "create" | "edit";
  initialValue?: Question | null;
  onSubmit: (data: { title: string }) => void;
  onCancel?: () => void;
}

export default function QuestionForm({
  mode,
  initialValue,
  onSubmit,
  onCancel,
}: Props) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (initialValue) {
      setTitle(initialValue.title);
    } else {
      setTitle("");
    }
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim() });
  };

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">
        {mode === "create" ? "新增題目" : "編輯題目"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">題目標題</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="請輸入題目標題"
          />
        </div>

        <div className="flex gap-3 justify-end">
          {onCancel && (
            <Button type="button" variant="muted" onClick={onCancel}>
              取消
            </Button>
          )}
          <Button type="submit" variant="primary">
            {mode === "create" ? "建立" : "儲存"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
