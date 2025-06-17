/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://karayaka.ru',
  generateRobotsTxt: true,
  exclude: ['/assets/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/assets/'],
      },
    ],
    transformRobotsTxt: async () => {
      return `# *
User-agent: *
Disallow: /assets/
Clean-param: lang&etext&type

# Host
Host: https://karayaka.ru

# Sitemaps
Sitemap: https://karayaka.ru/sitemap.xml`;
    },
  },
};
