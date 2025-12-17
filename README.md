# 📚 MERN 教育題庫平台（Teacher & Student Learning System）

一個完整的教育平台，提供老師管理題庫、學生線上測驗、學習分析儀表板、答題紀錄追蹤等功能。  
採用 **MERN Stack（MongoDB + Express + React + Node.js）** 打造，支援角色權限、統計分析、PDF 考卷產生等功能。

---

## 🚀 功能特色

### 👨‍🏫 老師端（Teacher）
- 題目管理（新增 / 編輯 / 刪除 / 搜尋 / 篩選 / 分頁）
- 儀表板 Dashboard（Chart.js）
  - 題庫統計（科目 / 年級 / 難度）
  - 題庫成長（每月新增題目）
  - 學生答題統計（每日答題數、平均分數、錯題率）
- 查看學生答題紀錄（TeacherAnswers）
- PDF 考卷產生（puppeteer）

### 🧑‍🎓 學生端（Student）
- 自動抽題測驗（依科目 / 年級 / 難度）
- 即時計分
- 錯題解析
- 答題紀錄自動儲存

### 🔐 角色權限（RBAC）
- Teacher：可管理題庫、查看統計、查看學生紀錄
- Student：只能進行測驗與查看自己的成績

---

## 🏗️ 技術架構

### 前端（React）
- React 18
- React Router
- Chart.js + react-chartjs-2
- JWT 驗證
- ProtectedRoute 角色保護

### 後端（Node + Express）
- Express Router 模組化
- JWT 驗證 middleware
- RBAC 角色權限 middleware
- MongoDB Aggregation Pipeline（統計分析）
- Puppeteer PDF 產生（可選）

### 資料庫（MongoDB）
- Question（題目）
- Answer（學生答題紀錄）
- User（含角色）

---

## 📂 專案結構

