// Типы и вспомогательные функции для клиентской части, без зависимостей от fs

export interface PostData {
  id: string;
  title: string;
  date: string;
  contentHtml?: string;
  excerpt?: string;
}

export interface LocalizedPostData {
  [key: string]: PostData | undefined;
}

// Форматирование даты для отображения
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

// Создание превью текста (может быть полезно, если нужно манипулировать с данными на клиенте)
export function createExcerpt(text: string, maxLength: number = 300): string {
  // Удаляем HTML-теги, если они есть
  const plainText = text
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Обрезаем до нужной длины
  return plainText.length > maxLength ? plainText.slice(0, maxLength) + '...' : plainText;
}
