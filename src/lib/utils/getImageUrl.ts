export const getOptimizedImageUrl = (path: string) => {
  // Remove slash from link
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const basePath = cleanPath.replace(/\.\w+$/, '');

  return {
    webp: `https://karayaka.ru/${basePath}.webp`,
    original: `https://karayaka.ru/${cleanPath}`,
  };
};

export const getImageUrl = (path: string) => {
  // Remove slash from link
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `https://karayaka.ru/${cleanPath}`;
};

export const getVideoUrl = (path: string) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `https://karayaka.ru/${cleanPath}`;
};
