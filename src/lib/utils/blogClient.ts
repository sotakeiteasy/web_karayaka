export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function createExcerpt(text: string, maxLength: number = 300): string {
  const plainText = text
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return plainText.length > maxLength ? plainText.slice(0, maxLength) + '...' : plainText;
}
