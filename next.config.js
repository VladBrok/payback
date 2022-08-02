/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["fakestoreapi.com", "randomuser.me", "avatars.yandex.net"],
  },
};

module.exports = nextConfig;
