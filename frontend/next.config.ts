/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false   // ✅ 關閉 Turbopack，避免 M1/M2 swc 錯誤
  }
};

export default nextConfig;
