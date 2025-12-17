import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "登入失敗");
        return;
      }

      // 儲存 JWT
      localStorage.setItem("token", data.token);

      // 導向首頁或老師後台
      window.location.href = "/dashboard";
    } catch (err) {
      setError("伺服器錯誤");
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h2>登入</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="密碼"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit">登入</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
