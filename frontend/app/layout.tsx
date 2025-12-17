import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "全科題庫學院",
  description: "教材級題庫平台",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="bg-gray-100 text-gray-900">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container flex justify-between items-center py-4">
            <a href="/" className="text-2xl font-bold text-primary">
              📘 全科題庫學院
            </a>

            <nav className="flex gap-6 text-lg">
              <a href="/teacher/dashboard" className="hover:text-primary">
                老師後台
              </a>
              <a href="/student/practice" className="hover:text-primary">
                學生練習
              </a>
              <a href="/print/paper" className="hover:text-primary">
                PDF 印卷
              </a>
              <a href="/login" className="hover:text-primary">
                登入
              </a>
            </nav>
          </div>
        </header>

        <main className="container py-10">{children}</main>
      </body>
    </html>
  );
}
