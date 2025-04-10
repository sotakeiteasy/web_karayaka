
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://karayaka.ru',
    generateRobotsTxt: true,
    exclude: [
      '*/simpleSlider/*',
      '*/CustomSlider/*',
      '*/PaginatedAds/*',
      '/home',
      '/search',
      '/video/*',
      '/images/*'
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
            '/home',
            '/video/',
            '/images/'
          ]
        }
      ]
    }
  }
  