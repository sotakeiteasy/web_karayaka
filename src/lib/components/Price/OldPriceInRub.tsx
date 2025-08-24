import { RateContext } from '@/lib/contexts/RateContext';
import { useContext } from 'react';
interface Props {
  priceInTry: number;
  locale: 'ru' | 'en';
}

export function OldPriceInRub({ priceInTry, locale }: Props) {
  const { rate, date, loading, error } = useContext(RateContext)!;
  if (locale === 'en' || error || !rate || !date) {
    return <span>{new Intl.NumberFormat('ru-RU').format(priceInTry)} ₺</span>;
  }

  if (loading) return <span>считаем...</span>;
  const converted = priceInTry * rate;
  const roundedToThousands = Math.round(converted / 1000) * 1000;
  const rubPrice = roundedToThousands.toLocaleString('ru-RU');
  if (locale === 'ru') return <span> {rubPrice} ₽</span>;
}
