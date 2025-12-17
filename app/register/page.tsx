"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const register = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("註冊成功，請登入");
      window.location.href = "/login";
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">註冊</h1>

      <input
        className="border p-2 w-full mt-4"
        placeholder="帳號"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="border p-2 w-full mt-4"
        placeholder="密碼"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        className="border p-2 w-full mt-4"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="student">學生</option>
        <option value="teacher">老師</option>
      </select>

      <button
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
        onClick={register}
      >
        註冊
      </button>
    </div>
  );
}
