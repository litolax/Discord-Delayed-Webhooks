// const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    // outputFileTracingRoot: path.join(__dirname, '../../'),
    // esmExternals: "loose",
  }
}

module.exports = nextConfig

