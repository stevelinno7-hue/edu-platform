import { useEffect, useState } from "react";
import { api } from "../utils/api";

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);

  // 搜尋 + 篩選條件
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [level, setLevel] = useState("");

  // 分頁
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

const [subjects, setSubjects] = useState([]);
const [grades, setGrades] = useState([]);
const [levels, setLevels] = useState([]);

useEffect(() => {
  async function loadMeta() {
    setSubjects(await api("/meta/subjects"));
    setGrades(await api("/meta/grades"));
    setLevels(await api("/meta/levels"));
  }
  loadMeta();
}, []);


  // 主要載入函式
  async function load() {
    const params = new URLSearchParams();

    if (subject) params.append("subject", subject);
    if (grade) params.append("grade", grade);
    if (level) params.append("level", level);
    if (search) params.append("search", search);

    params.append("page", page);
    params.append("limit", 10);

    const data = await api(`/questions?${params.toString()}`);

    setQuestions(data.items || []);
    setPages(data.pages || 1);
  }

  // 當篩選條件或搜尋變動時重新載入
  useEffect(() => {
    load();
  }, [subject, grade, level, search, page]);

  return (
    <div style={{ padding: 20 }}>
      <h2>題目管理</h2>

      {/* 搜尋框 */}
      <input
        placeholder="搜尋題目或選項"
        value={search}
        onChange={e => {
          setPage(1);
          setSearch(e.target.value);
        }}
        style={{ padding: 6, width: 200, marginBottom: 20 }}
      />

      {/* 篩選 UI */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <select
          value={subject}
          onChange={e => {
            setPage(1);
            setSubject(e.target.value);
          }}
        >
          <option value="">科目（全部）</option>
          {subjects.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={grade}
          onChange={e => {
            setPage(1);
            setGrade(e.target.value);
          }}
        >
          <option value="">年級（全部）</option>
          {grades.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select
          value={level}
          onChange={e => {
            setPage(1);
            setLevel(e.target.value);
          }}
        >
          <option value="">難度（全部）</option>
          {levels.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      {/* 題目列表 */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>題目</th>
            <th>科目</th>
            <th>年級</th>
            <th>難度</th>
          </tr>
        </thead>

        <tbody>
          {questions.map(q => (
            <tr key={q._id}>
              <td>{q.question}</td>
              <td>{q.subject}</td>
              <td>{q.grade}</td>
              <td>{q.level}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 分頁 */}
      <div style={{ marginTop: 20 }}>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          上一頁
        </button>

        <span style={{ margin: "0 10px" }}>
          {page} / {pages}
        </span>

        <button disabled={page >= pages} onClick={() => setPage(page + 1)}>
          下一頁
        </button>
      </div>
    </div>
  );
}
