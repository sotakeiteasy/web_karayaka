export const getImageUrl = (path: string) => {
  // Remove slash from link
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `https://karayaka.ru/${cleanPath}`;
};
