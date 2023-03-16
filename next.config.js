/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  watch: true,
  debug: true,
  images: {
    domains: ['d500.epimg.net'],
  },
  experimental: {
    appDir: false
  }
}

module.exports = nextConfig
