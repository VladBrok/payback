/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: [
      "fakestoreapi.com",
      "randomuser.me",
      "avatars.yandex.net",
      "lh3.googleusercontent.com",
      "i.ibb.co",
    ],
  },
};

module.exports = nextConfig;
