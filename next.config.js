/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ['via.placeholder.com'],
  },
  // transpilePackages: [
  //   '@ant-design/icons',
  //   '@ant-design/icons-svg',
  //   'antd'
  // ],
}

module.exports = nextConfig 