import Icon from '@mdi/react';
import { mdiMapMarkerOutline, mdiIdentifier } from '@mdi/js';
import styles from '../index.module.scss';
import { countryTranslations, cityTranslations, districtTranslations } from '@/lib/translations';
import { Ad, SearchType } from '@/lib/types';
import { getPropertyTitle } from '@/lib/utils/ads/formatters';

interface Props {
  ad: Ad;
  lang: 'ru' | 'en';
  t: any;
  tooltip: boolean;
  onCopy: () => void;
}

export function TitleInfo({ ad, lang, t, tooltip, onCopy }: Props) {
  const typeStatus = ad.type === SearchType.Buy ? t('ad.property.titleForSale') : t('ad.property.titleForRent');

  const propertyInfo = getPropertyTitle(ad, lang, t);

  const titleText = lang === 'ru' ? `${typeStatus} ${propertyInfo}` : `${propertyInfo} ${typeStatus}`;

  const location = [
    countryTranslations[ad.location.country][lang],
    cityTranslations[ad.location.city][lang],
    ad.location.district ? districtTranslations[ad.location.district]?.[lang] : null,
  ]
    .filter(Boolean)
    .join(', ');

  const price =
    ad.price.try !== undefined && ad.price.try !== null
      ? `${new Intl.NumberFormat('ru-RU').format(ad.price.try)} ₺`
      : ad.price.rub !== undefined && ad.price.rub !== null
      ? `${new Intl.NumberFormat('ru-RU').format(ad.price.rub)} ₽`
      : '';

  return (
    <div className={styles.titleInfo}>
      <div className={styles.rightTitleInfo}>
        <p>{titleText}</p>
        <p>
          <Icon path={mdiMapMarkerOutline} size={1} />
          {location}
        </p>
        <p className={styles.id}>
          <button className={styles.copyButton} onClick={onCopy}>
            <Icon path={mdiIdentifier} size={1.3} />
          </button>
          {ad.id}
          <span className={`${styles.tooltip} ${tooltip ? styles.active : ''}`}>{t('ad.copy')}</span>
        </p>
      </div>
      <div className={styles.leftTitleInfo}>
        <p className={styles.price}>{price}</p>
      </div>
    </div>
  );
}
