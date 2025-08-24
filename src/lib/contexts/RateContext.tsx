// context/ExchangeRateContext.tsx
import React, { createContext, useEffect, useState } from 'react';
import { getTryRate } from '@/lib/utils/priceConversion/getTryRate';

export interface RateContextValue {
  rate: number | null;
  date: string | null;
  loading: boolean;
  error: boolean;
}

export const RateContext = createContext<RateContextValue | undefined>(undefined);

export const RateProvider = ({ children, locale }: { children: React.ReactNode; locale: 'ru' | 'en' }) => {
  const [rate, setRate] = useState<number | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(locale === 'ru');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (locale !== 'ru') return;

    const fetchRate = async () => {
      setLoading(true);
      const data = await getTryRate();
      if (data) {
        setRate(data.rate);
        setDate(data.date);
        setError(false);
      } else {
        setError(true);
      }
      setLoading(false);
    };

    fetchRate();
  }, [locale]);

  return <RateContext.Provider value={{ rate, date, loading, error }}>{children}</RateContext.Provider>;
};
