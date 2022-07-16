/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
    bodyParser: false,
    sizeLimit: "7mb",
  },
};

module.exports = nextConfig;
