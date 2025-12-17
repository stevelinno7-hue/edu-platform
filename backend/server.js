import express from "express";
import cors from "cors";
import "./config/db.js";
import questionRoutes from "./routes/questions.js";
import authRoutes from "./routes/auth.js";
import metaRoutes from "./routes/meta.js";
import authRoutes from "./routes/auth.js";
import questionRoutes from "./routes/questions.js";
import answerRoutes from "./routes/answers.js";
import TeacherAnswers from "./pages/TeacherAnswers";

<Route
  path="/answers"
  element={
    <ProtectedRoute role="teacher">
      <TeacherAnswers />
    </ProtectedRoute>
  }
/>

app.use("/auth", authRoutes);
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);


app.use("/meta", metaRoutes);

const app = express();
import statsRoutes from "./routes/stats.js";

app.use("/stats", statsRoutes);


app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/questions", questionRoutes);

app.listen(3001, () => {
  console.log("✅ Backend API running at http://localhost:3001");
});
