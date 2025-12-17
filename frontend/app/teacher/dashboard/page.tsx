"use client";

import { useEffect, useState } from "react";

type Question = {
  id: string;
  question: string;
  answer: string;
  options: string[];
  subject: string;
};

export default function StudentPractice() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selected, setSelected] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);

  // ✅ 計時器（每秒 +1）
  useEffect(() => {
    const t = setInterval(() => setTimer((prev) => prev + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // ✅ 取得題目
  const loadQuestion = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/questions/random`
    );
    const data = await res.json();
    setQuestion(data);
    setSelected("");
    setResult("");
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  if (!question) return <p className="p-10">載入中…</p>;

  // ✅ 送出答案
  const submit = () => {
    if (!selected) return;

    const isCorrect = selected === question.answer;

    if (isCorrect) {
      setScore((s) => s + 1);
      setResult("✅ 正確！");
    } else {
      setResult(`❌ 錯誤，正確答案是：${question.answer}`);
    }

    setCount((c) => c + 1);
  };

  // ✅ 顯示成績
  if (count >= 10) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">🎉 練習完成</h1>
        <p className="mt-4 text-xl">你的分數：{score} / 10</p>
        <p className="mt-2 text-gray-600">花費時間：{timer} 秒</p>

        <button
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setScore(0);
            setCount(0);
            setTimer(0);
            loadQuestion();
          }}
        >
          再練一次
        </button>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">🎓 學生練習</h1>

      <p className="mt-4 text-gray-600">已作答：{count} / 10</p>
      <p className="text-gray-600">計時：{timer} 秒</p>

      <div className="mt-6 p-6 border rounded bg-gray-50">
        <p className="text-xl font-semibold">{question.question}</p>

        <div className="mt-4 space-y-2">
          {question.options.map((opt) => (
            <label key={opt} className="flex items-center gap-2">
              <input
                type="radio"
                name="opt"
                value={opt}
                checked={selected === opt}
                onChange={() => setSelected(opt)}
              />
              {opt}
            </label>
          ))}
        </div>

        <button
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
          onClick={submit}
        >
          送出答案
        </button>

        {result && <p className="mt-4 text-lg">{result}</p>}

        {result && (
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={loadQuestion}
          >
            下一題
          </button>
        )}
      </div>
    </div>
  );
}
