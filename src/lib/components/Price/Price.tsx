import React from 'react';
import { PriceInRub } from './PriceInRub';
import { OldPriceInRub } from './OldPriceInRub';
type PriceProps = {
  locale: 'ru' | 'en';
  price: {
    try?: number | null;
    rub?: number | null;
    try_old?: number | null;
  };
  stylesName?: string;
  mySize?: number;
};

export const Price = ({ locale, price, stylesName, mySize }: PriceProps) => {
  if (price.try_old) {
    if (locale === 'ru') return <OldPriceInRub priceInTry={price.try_old!} locale={locale} />;
    else return <span>{new Intl.NumberFormat('ru-RU').format(price.try_old!)} ₺</span>;
  }
  if (locale === 'ru' && price.try) {
    return <PriceInRub priceInTry={price.try!} stylesName={stylesName} mySize={mySize} />;
  }

  if (price.rub) {
    return <span>{new Intl.NumberFormat('ru-RU').format(price.rub!)} ₽</span>;
  }

  if (locale === 'en' && price.try) {
    return <span>{new Intl.NumberFormat('ru-RU').format(price.try!)} ₺</span>;
  }

  return null;
};
