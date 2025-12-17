import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useSearchParams } from "react-router-dom";

export default function StudentQuiz() {
  const [params] = useSearchParams();
  const subject = params.get("subject");
  const count = params.get("count") || 10;

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await api(`/questions/random?subject=${subject}&count=${count}`);
      setQuestions(data);
    }
    load();
  }, [subject, count]);

  function choose(qid, option) {
    setAnswers(prev => ({ ...prev, [qid]: option }));
  }

  function score() {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q._id] === q.answer) correct++;
    });
    return correct;
  }

  async function submit() {
    setSubmitted(true);

    // ⭐ 建立要送到後端的 payload
    const payload = {
      userId: "student001", // 之後可改成登入者
      subject,
      grade: questions[0]?.grade || null,
      level: questions[0]?.level || null,
      score: score(),
      total: questions.length,
      questions: questions.map(q => ({
        questionId: q._id,
        question: q.question,
        options: q.options,
        correctAnswer: q.answer,
        studentAnswer: answers[q._id] || null,
        isCorrect: answers[q._id] === q.answer
      }))
    };

    // ⭐ 送到後端 /answers
    await api("/answers", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  if (submitted) {
    return (
      <div style={{ padding: 20 }}>
        <h2>測驗結果</h2>
        <p>總題數：{questions.length}</p>
        <p>答對：{score()}</p>
        <p>正確率：{Math.round((score() / questions.length) * 100)}%</p>

        <h3>錯題解析</h3>
        {questions.map(q => (
          <div key={q._id} style={{ marginBottom: 20 }}>
            <strong>{q.question}</strong>
            <div>你的答案：{answers[q._id] || "未作答"}</div>
            <div>正確答案：{q.answer}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>學生測驗（{subject}）</h2>

      {questions.map((q, index) => (
        <div key={q._id} style={{ marginBottom: 20 }}>
          <h3>{index + 1}. {q.question}</h3>

          {q.options.map(opt => (
            <div key={opt}>
              <label>
                <input
                  type="radio"
                  name={q._id}
                  checked={answers[q._id] === opt}
                  onChange={() => choose(q._id, opt)}
                />
                {opt}
              </label>
            </div>
          ))}
        </div>
      ))}

      <button onClick={submit}>提交答案</button>
    </div>
  );
}
