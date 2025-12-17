/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ 這是乾淨、相容 Next.js 15 的設定
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
};

export default nextConfig;
