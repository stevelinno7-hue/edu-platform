import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useParams } from "react-router-dom";

export default function QuestionEdit() {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    api(`/questions/${id}`).then(data => setForm(data));
  }, [id]);

  if (!form) return <p>載入中...</p>;

  function updateField(key, value) {
    setForm({ ...form, [key]: value });
  }

  function updateOption(i, value) {
    const newOptions = [...form.options];
    newOptions[i] = value;
    setForm({ ...form, options: newOptions });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await api(`/questions/${id}`, {
      method: "PUT",
      body: JSON.stringify(form)
    });
    window.location.href = "/questions";
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>編輯題目</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="題目"
          value={form.question}
          onChange={e => updateField("question", e.target.value)}
        />

        {form.options.map((opt, i) => (
          <input
            key={i}
            placeholder={`選項 ${i + 1}`}
            value={opt}
            onChange={e => updateOption(i, e.target.value)}
          />
        ))}

        <input
          placeholder="正確答案"
          value={form.answer}
          onChange={e => updateField("answer", e.target.value)}
        />

        <input
          placeholder="科目"
          value={form.subject}
          onChange={e => updateField("subject", e.target.value)}
        />

        <input
          placeholder="年級"
          value={form.grade}
          onChange={e => updateField("grade", e.target.value)}
        />

        <input
          placeholder="難度"
          value={form.level}
          onChange={e => updateField("level", e.target.value)}
        />

        <button type="submit">更新</button>
      </form>
    </div>
  );
}
