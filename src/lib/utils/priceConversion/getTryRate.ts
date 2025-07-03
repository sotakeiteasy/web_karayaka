const CBR_API_URL = 'https://www.cbr-xml-daily.ru/daily_json.js';
const STORAGE_KEY = 'cbr-try-rate-cache';
const CACHE_HOURS = 24;
const MIN_RETRY_DELAY = 60 * 1000; // one minute

export interface CachedRate {
  rate: number;
  date: string;
}

export const getTryRate = async (): Promise<CachedRate | null> => {
  const now = Date.now();

  try {
    const cachedStr = localStorage.getItem(STORAGE_KEY);

    if (cachedStr) {
      const cached = JSON.parse(cachedStr) as CachedRate;
      const cacheDate = new Date(cached.date).getTime();
      const hoursPassed = (now - cacheDate) / (1000 * 60 * 60);

      if (hoursPassed < CACHE_HOURS) {
        return cached;
      }
    }

    const lastFetchTime = Number(localStorage.getItem('lastFetchRateTime'));
    if (lastFetchTime && now - lastFetchTime < MIN_RETRY_DELAY) {
      return null; // user is trying to reload page after error in get too soon
    }

    const response = await fetch(CBR_API_URL);

    const json = await response.json();

    if (!json?.Valute?.TRY) {
      console.warn('TRY currency data not found');
      return null;
    }

    const tryData = json.Valute.TRY;
    const { Value, Nominal } = tryData;
    const tryRate = Value / Nominal;
    const rawDate = json.Date || new Date().toISOString();
    if (!rawDate) console.warn('Date is missing in response');
    const date = rawDate.slice(0, 10);

    const newRate: CachedRate = {
      rate: tryRate,
      date,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRate));
    return newRate;
  } catch (error) {
    localStorage.setItem('lastFetchRateTime', Date.now().toString());
    console.warn('Ошибка при получении курса TRY -> RUB:', error);
    return null;
  }
};
