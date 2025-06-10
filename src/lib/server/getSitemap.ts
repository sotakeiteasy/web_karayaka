const fs = require('fs');
const path = require('path');
const { parseStringPromise } = require('xml2js');

export async function getUrlsFromSitemap(): Promise<string[]> {
  const filePath = path.join(process.cwd(), 'public', 'sitemap-0.xml');

  const xml = fs.readFileSync(filePath, 'utf8');
  const result = await parseStringPromise(xml);

  return result.urlset.url.map((item: any) => item.loc[0]);
}
