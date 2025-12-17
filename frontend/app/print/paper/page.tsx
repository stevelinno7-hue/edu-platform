"use client";

export default function PrintPaper() {
  const downloadPDF = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pdf?subject=english`,
      "_blank"
    );
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">🖨️ 考卷預覽 / PDF 下載</h1>

      <p className="mt-4 text-gray-600">
        點擊下方按鈕即可產生 PDF 考卷（含題目 + 答案）。
      </p>

      <button
        onClick={downloadPDF}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
      >
        下載 PDF
      </button>
    </div>
  );
}
