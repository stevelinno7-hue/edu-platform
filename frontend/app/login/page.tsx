"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      }
    );

    const data = await res.json();

    if (data.role === "teacher") router.push("/teacher/dashboard");
    if (data.role === "student") router.push("/student/practice");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">登入</h1>

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

      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={login}
      >
        登入
      </button>
    </div>
  );
}
