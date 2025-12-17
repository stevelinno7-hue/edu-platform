export default function Page() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">教育平台首頁</h1>

      <p className="text-gray-600">
        歡迎來到教育平台，請從上方選單選擇功能，或前往題目列表開始管理題目。
      </p>

      <div className="mt-6">
        <a
          href="/questions"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          前往題目列表
        </a>
      </div>
    </div>
  );
}
