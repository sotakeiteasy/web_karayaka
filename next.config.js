/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'karayaka.ru',
        pathname: '/images/**',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  transpilePackages: [
    'antd',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-dialog',
    'rc-motion',
    'rc-field-form',
    'rc-select',
    'rc-upload',
    'rc-collapse',
    'rc-menu',
    'rc-tabs',
    'rc-table',
    'rc-tooltip',
    'rc-resize-observer',
    'rc-virtual-list',
    'rc-tree',
  ],
  webpack: (config) => {
    config.resolve.fullySpecified = false;
    return config;
  },
  poweredByHeader: false,
};

module.exports = nextConfig;
