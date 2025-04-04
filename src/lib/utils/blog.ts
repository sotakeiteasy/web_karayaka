import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

// Функция выбора правильной папки в зависимости от языка
function getBlogDirectory(locale: string = "ru") {
  const basePath = path.join(process.cwd(), "src/data/blog");
  return path.join(basePath, locale === "en" ? "english" : "russian");
}

interface PostData {
  id: string;
  title: string;
  date: string;
  contentHtml?: string;
  excerpt?: string;
}

// Простая функция для создания текстового превью из HTML
function createExcerpt(htmlContent: string, maxLength: number = 300): string {
  // Удаляем HTML-теги и получаем только текст
  const textContent = htmlContent
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Обрезаем до нужной длины и добавляем многоточие
  return textContent.length > maxLength
    ? textContent.slice(0, maxLength) + "..."
    : textContent;
}

export async function getSortedPostsData(
  locale: string = "ru"
): Promise<PostData[]> {
  const postsDirectory = getBlogDirectory(locale);

  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsDataPromises = fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);

      const processedContent = await remark()
        .use(remarkGfm)
        .use(html)
        .process(matterResult.content);
      const contentHtml = processedContent.toString();
      const excerpt = createExcerpt(contentHtml);

      return {
        id,
        contentHtml,
        excerpt,
        ...(matterResult.data as Omit<PostData, "id">),
      } as PostData;
    });

    const allPostsData = await Promise.all(allPostsDataPromises);
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error(`Error reading blog posts for locale ${locale}:`, error);
    return [];
  }
}

export function getAllPostIds(locales: string[] = ["ru", "en"]) {
  const paths: Array<{ params: { id: string }; locale: string }> = [];

  locales.forEach((locale) => {
    const postsDirectory = getBlogDirectory(locale);

    try {
      const fileNames = fs.readdirSync(postsDirectory);
      fileNames.forEach((fileName) => {
        const id = fileName.replace(/\.md$/, "");
        paths.push({
          params: { id },
          locale,
        });
      });
    } catch (error) {
      console.log(`No blog posts for locale ${locale}`);
    }
  });

  return paths;
}

export async function getPostData(id: string, locale: string = "ru") {
  const postsDirectory = getBlogDirectory(locale);
  const fullPath = path.join(postsDirectory, `${id}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(remarkGfm)
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      id,
      contentHtml,
      ...matterResult.data,
    };
  } catch (error) {
    if (locale !== "ru") {
      return getPostData(id, "ru");
    }
    throw error;
  }
}
