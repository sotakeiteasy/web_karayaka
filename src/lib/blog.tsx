import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html'

// Функция выбора правильной папки в зависимости от языка
function getBlogDirectory(locale: string = 'ru') {
  const basePath = path.join(process.cwd(), 'src/data/blog');
  
  switch(locale) {
    case 'en':
      return path.join(basePath, 'english');
    // case 'tr':
    //   return path.join(basePath, 'en');
    case 'ru':
    default:
      return path.join(basePath, 'russian');
  }
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
  const textContent = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Обрезаем до нужной длины и добавляем многоточие
  return textContent.length > maxLength 
    ? textContent.slice(0, maxLength) + '...' 
    : textContent;
}

export async function getSortedPostsData(locale: string = 'ru'): Promise<PostData[]> {
  // Get the correct directory based on locale
  const postsDirectory = getBlogDirectory(locale);
  
  // Get file names under locale directory
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsDataPromises = fileNames.map(async (fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');
 
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
 
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    
    // Преобразуем markdown контент в HTML
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();
    
    // Создаем текстовое превью
    const excerpt = createExcerpt(contentHtml);
 
    // Combine the data with the id
    return {
      id,
      contentHtml,
      excerpt,
      ...(matterResult.data as Omit<PostData, 'id'>),
    } as PostData;
  });

  // Дожидаемся завершения всех обработок
  const allPostsData = await Promise.all(allPostsDataPromises);

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds(locales: string[] = ['ru', 'en']) {
  let paths: any[] = [];
  
  // Для каждой локали получаем ID всех статей
  locales.forEach(locale => {
    const postsDirectory = getBlogDirectory(locale);
    
    try {
      const fileNames = fs.readdirSync(postsDirectory);
      
      // Для каждого файла создаем путь с правильной локалью
      fileNames.forEach(fileName => {
        const id = fileName.replace(/\.md$/, '');
        paths.push({
          params: { id },
          locale
        });
      });
    } catch(e) {
      console.log(`No blog posts for locale ${locale}`);
    }
  });
  
  return paths;
}

export async function getPostData(id: string, locale: string = 'ru') {
  const postsDirectory = getBlogDirectory(locale);
  const fullPath = path.join(postsDirectory, `${id}.md`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString()
    
    // Combine the data with the id
    return {
      id,
      contentHtml,
      ...matterResult.data,
    };
  } catch(e) {
    // Если файл не найден в запрошенной локали, пробуем найти его в русской
    if (locale !== 'ru') {
      return getPostData(id, 'ru');
    }
    throw e;
  }
}