/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // ❗ 關閉 Turbopack
  },
  // 如果你有其他設定，保留即可
};

export default nextConfig;
