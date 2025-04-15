/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://karayaka.ru',
  generateRobotsTxt: true,
  exclude: ['/search', '/video/*', '/images/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/search', '/video/', '/images/'],
      },
    ],
  },
};
