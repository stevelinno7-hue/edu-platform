import { useEffect, useState } from "react";
import { api } from "../utils/api";

export default function TeacherAnswers() {
  const [records, setRecords] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await api("/answers");
      setRecords(data);
    }
    load();
  }, []);

  function toggleExpand(id) {
    setExpanded(expanded === id ? null : id);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>學生答題紀錄</h2>

      <table border="1" cellPadding="8" style={{ width: "100%", marginTop: 20 }}>
        <thead>
          <tr>
            <th>學生 ID</th>
            <th>科目</th>
            <th>分數</th>
            <th>總題數</th>
            <th>日期</th>
            <th>詳細</th>
          </tr>
        </thead>

        <tbody>
          {records.map(r => (
            <>
              <tr key={r._id}>
                <td>{r.userId}</td>
                <td>{r.subject}</td>
                <td>{r.score}</td>
                <td>{r.total}</td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => toggleExpand(r._id)}>
                    {expanded === r._id ? "收合" : "查看"}
                  </button>
                </td>
              </tr>

              {expanded === r._id && (
                <tr>
                  <td colSpan="6">
                    <div style={{ padding: 10, background: "#f9f9f9" }}>
                      <h4>詳細答題紀錄</h4>

                      {r.questions.map((q, index) => (
                        <div key={index} style={{ marginBottom: 15 }}>
                          <strong>{index + 1}. {q.question}</strong>
                          <div>學生答案：{q.studentAnswer || "未作答"}</div>
                          <div>正確答案：{q.correctAnswer}</div>
                          <div>
                            {q.isCorrect ? 
                              <span style={{ color: "green" }}>✔ 正確</span> :
                              <span style={{ color: "red" }}>✘ 錯誤</span>
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
