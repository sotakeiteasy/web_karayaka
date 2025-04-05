
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://karayaka.ru',
    generateRobotsTxt: true,
    exclude: [
      '*/simpleSlider/*',
      '*/CustomSlider/*',
      '*/PaginatedAds/*'
    ],
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
          disallow: [
            '/search?',
            '/*/simpleSlider/',
            '/*/CustomSlider/',
            '/*/PaginatedAds/'
          ]
        }
      ]
    }
  }
  