const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");
const questionService = require("../services/questionService");

router.get("/", async (req, res) => {
  const subject = req.query.subject || "english";

  // ✅ 取得題庫
  const questions = await questionService.getQuestions(subject);

  // ✅ 產生 HTML
  const html = `
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body { font-family: "Noto Sans TC", sans-serif; padding: 40px; }
          h1 { text-align: center; }
          .question { margin-bottom: 20px; }
          .answer { margin-top: 40px; page-break-before: always; }
        </style>
      </head>
      <body>
        <h1>${subject.toUpperCase()} 考卷</h1>

        ${questions
          .map(
            (q, i) => `
          <div class="question">
            <strong>${i + 1}. ${q.question}</strong>
            <br/>
            ${q.options
              ?.map((opt) => `<div> - ${opt}</div>`)
              .join("")}
          </div>
        `
          )
          .join("")}

        <div class="answer">
          <h2>答案</h2>
          ${questions
            .map((q, i) => `<div>${i + 1}. ${q.answer}</div>`)
            .join("")}
        </div>
      </body>
    </html>
  `;

  // ✅ Puppeteer 產生 PDF
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  // ✅ 回傳 PDF
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=exam.pdf",
  });

  res.send(pdfBuffer);
});

module.exports = router;
