import { getTryRate, CachedRate } from '../lib/utils/priceConversion/getTryRate';

const CBR_API_URL = 'https://www.cbr-xml-daily.ru/daily_json.js';
const STORAGE_KEY = 'cbr-try-rate-cache';

describe('getTryRate', () => {
  const FIXED_TIME = new Date('2023-01-02T12:00:00Z').getTime(); // fixed timestamp for Date.now()

  const store: Record<string, string> = {};

  beforeAll(() => {
    // Mock Date.now globally for all tests
    jest.spyOn(Date, 'now').mockImplementation(() => FIXED_TIME);
  });

  afterAll(() => {
    jest.spyOn(Date, 'now').mockRestore();
  });

  beforeEach(() => {
    Object.keys(store).forEach((key) => delete store[key]);

    // Mock localStorage methods on Storage.prototype for correct typings
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
      return store[key] || null;
    });
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation((key: string, value: string) => {
      store[key] = value;
    });

    // Reset fetch mock before each test
    global.fetch = jest.fn();
  });

  it('returns cached rate if cache is fresh (less than 24 hours old)', async () => {
    const cachedRate: CachedRate = {
      rate: 10,
      date: '2023-01-02', // 24 hours ago
    };
    store[STORAGE_KEY] = JSON.stringify(cachedRate);

    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });

    const result = await getTryRate();

    expect(result).toEqual(cachedRate);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('fetches new rate if cache is expired (more than 24 hours old)', async () => {
    const oldCachedRate: CachedRate = {
      rate: 10,
      date: new Date(FIXED_TIME - 1000 * 60 * 60 * 25).toISOString().slice(0, 10), // 25 hours ago
    };
    store[STORAGE_KEY] = JSON.stringify(oldCachedRate);

    const mockResponse = {
      Valute: {
        TRY: {
          Value: 20,
          Nominal: 1,
        },
      },
      Date: new Date(FIXED_TIME).toISOString(),
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await getTryRate();

    expect(global.fetch).toHaveBeenCalledWith(CBR_API_URL);
    expect(result).toEqual({
      rate: 20,
      date: mockResponse.Date.slice(0, 10),
    });

    const stored = JSON.parse(store[STORAGE_KEY]!);
    expect(stored.rate).toBe(20);
  });

  it('returns null if retry delay after error is not passed', async () => {
    store['lastFetchRateTime'] = (FIXED_TIME - 30 * 1000).toString();

    const result = await getTryRate();

    expect(result).toBeNull();
  });

  it('handles fetch error and sets lastFetchRateTime', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    const result = await getTryRate();

    expect(result).toBeNull();
    expect(store['lastFetchRateTime']).toBe(FIXED_TIME.toString());
  });

  it('returns null if TRY currency data is missing', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ Valute: {} }),
    });

    const result = await getTryRate();

    expect(result).toBeNull();
  });
});
