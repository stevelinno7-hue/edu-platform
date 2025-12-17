import express from 'express';
import cors from 'cors';
import questionsRouter from './routes/questions.js';
import './config/db.js'; // 初始化 DB（若你使用 MongoDB）

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/questions', questionsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Question API running on port ${PORT}`);
});
const pdfRoutes = require("./routes/pdf");
app.use("/api/pdf", pdfRoutes);
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
