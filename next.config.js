/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  watch: true,
  debug: true,
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
