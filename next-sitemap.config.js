
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://karayaka.ru',
    generateRobotsTxt: true,
    exclude: [
      '*/simpleSlider/*',
      '*/CustomSlider/*',
      '*/PaginatedAds/*',
      '/home',
      '/search'
    ],
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: [
            '/',
            '/search?type=',
          ],
          disallow: [
            '/search',
            '/*/simpleSlider/',
            '/*/CustomSlider/',
            '/*/PaginatedAds/',
            '/home'
          ]
        }
      ]
    }
  }
  