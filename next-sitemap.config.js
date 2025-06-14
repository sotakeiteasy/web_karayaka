/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://karayaka.ru',
  generateRobotsTxt: true,
  exclude: ['/video/*', '/images/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/video/', '/images/'],
      },
    ],
    transformRobotsTxt: async () => {
      return `# *
User-agent: *
Disallow: /video/
Disallow: /images/
Clean-param: lang&etext&type

# Host
Host: https://karayaka.ru

# Sitemaps
Sitemap: https://karayaka.ru/sitemap.xml`;
    },
  },
};
