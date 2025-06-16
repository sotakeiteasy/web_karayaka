import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { PostData, LocalizedPostData } from '@/lib/types';
import remarkImages from 'remark-images';

function getBlogDirectory(locale: string = 'ru') {
  const basePath = path.join(process.cwd(), 'src/data/blog');
  return path.join(basePath, locale === 'en' ? 'english' : 'russian');
}

function createExcerpt(htmlContent: string, maxLength: number = 300): string {
  const textContent = htmlContent
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return textContent.length > maxLength ? textContent.slice(0, maxLength) + '...' : textContent;
}

export async function getSortedPostsData(locale: string = 'ru'): Promise<PostData[]> {
  const postsDirectory = getBlogDirectory(locale);

  const fileNames = fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md'));
  const allPostsDataPromises = fileNames.map(async (fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkImages)
      .use(html, {
        sanitize: false,
      })
      .process(matterResult.content);
    const contentHtml = processedContent.toString();
    const excerpt = createExcerpt(contentHtml);

    return {
      id,
      contentHtml,
      excerpt,
      ...(matterResult.data as Omit<PostData, 'id'>),
    } as PostData;
  });

  const allPostsData = await Promise.all(allPostsDataPromises);
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
  const paths: Array<{ params: { id: string } }> = [];
  const languages = ['ru', 'en'];

  languages.forEach((locale) => {
    const postsDirectory = getBlogDirectory(locale);
    const fileNames = fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md'));
    fileNames.forEach((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      paths.push({
        params: { id },
      });
    });
  });

  return paths;
}

export async function getPostDataStatic(id: string, locale: string = 'ru'): Promise<PostData> {
  const postsDirectory = getBlogDirectory(locale);
  const fullPath = path.join(postsDirectory, `${id}.md`);

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const title = matterResult.data.title;

  const modifiedContent = matterResult.content.replace(
    /<img([^>]*?)(?:alt="[^"]*"|title="[^"]*")?([^>]*?)>/g,
    `<img$1 alt="${title}" title="${title}"$2>`
  );

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, {
      sanitize: false,
      allowDangerousHtml: true,
    })
    .process(modifiedContent);

  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  } as PostData;
}

export async function getPostData(id: string): Promise<LocalizedPostData> {
  const languages = ['ru', 'en'];
  const postData: LocalizedPostData = {};

  for (const lang of languages) {
    try {
      postData[lang] = await getPostDataStatic(id, lang);
    } catch (error) {
      console.error(`Cannot load post ${id} for language ${lang}:`, error);
    }
  }

  return postData;
}
