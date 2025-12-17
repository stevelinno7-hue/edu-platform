import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import QuestionList from "./pages/QuestionList";
import QuestionCreate from "./pages/QuestionCreate";
import QuestionEdit from "./pages/QuestionEdit";
import Dashboard from "./pages/Dashboard";
import StudentQuiz from "./pages/StudentQuiz";   // ⭐ 新增
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 登入頁 */}
        <Route path="/login" element={<Login />} />

        {/* 儀表板（需要登入） */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 題目列表（需要登入） */}
        <Route
          path="/questions"
          element={
            <ProtectedRoute>
              <QuestionList />
            </ProtectedRoute>
          }
        />

        {/* 新增題目（需要登入） */}
        <Route
          path="/questions/new"
          element={
            <ProtectedRoute>
              <QuestionCreate />
            </ProtectedRoute>
          }
        />

        {/* 編輯題目（需要登入） */}
        <Route
          path="/questions/:id"
          element={
            <ProtectedRoute>
              <QuestionEdit />
            </ProtectedRoute>
          }
        />

        {/* 學生測驗頁面（需要登入） */}
        <Route
          path="/student/quiz"
          element={
            <ProtectedRoute>
              <StudentQuiz />
            </ProtectedRoute>
          }
        />

        {/* 預設導向題目列表 */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <QuestionList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
