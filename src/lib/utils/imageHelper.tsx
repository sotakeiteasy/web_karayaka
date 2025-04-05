export const getImageUrl = (path: string) => {
  // Удаляем начальный слеш если он есть
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `https://karayaka.ru/${cleanPath}`;
};
