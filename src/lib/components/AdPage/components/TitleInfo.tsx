import Icon from '@mdi/react';
import { mdiMapMarkerOutline, mdiIdentifier } from '@mdi/js';
import styles from '../AdPage.module.scss';
import { countryTranslations, cityTranslations, districtTranslations } from '@/lib/translations';
import { Ad, SearchType } from '@/lib/types';
import { getPropertyTitle } from '@/lib/utils';
import { Price } from '@/lib/components/Price/Price';
interface Props {
  ad: Ad;
  lang: 'ru' | 'en';
  t: any;
  tooltip: boolean;
  onCopy: () => void;
}

export function TitleInfo({ ad, lang, t, tooltip, onCopy }: Props) {
  const typeStatus = ad.type === SearchType.Buy ? t('ad.property.titleForSale') : t('ad.property.titleForRent');

  const propertyInfo = getPropertyTitle(ad, lang);

  const titleText = lang === 'ru' ? `${typeStatus} ${propertyInfo}` : `${propertyInfo} ${typeStatus}`;

  const location = [
    countryTranslations[ad.location.country][lang],
    cityTranslations[ad.location.city][lang],
    ad.location.district ? districtTranslations[ad.location.district]?.[lang] : null,
  ]
    .filter(Boolean)
    .join(', ');

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
        <span className={styles.price}>
          <Price locale={lang} price={{ try: ad.price.try, rub: ad.price.rub }} mySize={1.5} />
        </span>
      </div>
    </div>
  );
}
