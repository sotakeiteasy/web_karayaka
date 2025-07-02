import { useTranslation, LinkWithLocale } from 'next-export-i18n';

import styles from './SearchCEOText.module.scss';

export default function RentCEOText() {
  const { t } = useTranslation();

  return (
    <div className={styles.CEOText}>
      <h1 className={styles.header}>{t('rentApartment.CEOText.title')}</h1>

      <p>
        {t('rentApartment.CEOText.p1.beforeLink')}{' '}
        <LinkWithLocale href="/offer/">{t('rentApartment.CEOText.p1.link')}</LinkWithLocale>{' '}
        {t('rentApartment.CEOText.p1.afterLink')}
      </p>

      <p>{t('rentApartment.CEOText.p2')}</p>

      <ul className={styles.list}>
        <li>{t('rentApartment.CEOText.bullets.0')}</li>
        <li>{t('rentApartment.CEOText.bullets.1')}</li>
        <li>{t('rentApartment.CEOText.bullets.2')}</li>
        <li>{t('rentApartment.CEOText.bullets.3')}</li>
        <li>{t('rentApartment.CEOText.bullets.4')}</li>
      </ul>

      <p>
        {t('rentApartment.CEOText.p3.beforeLink')}{' '}
        <LinkWithLocale href="/discounts/">{t('rentApartment.CEOText.p3.link')}</LinkWithLocale>{' '}
        {t('rentApartment.CEOText.p3.afterLink')}
      </p>

      <p>
        {t('rentApartment.CEOText.p4.beforeLink')}{' '}
        <LinkWithLocale href="/about-us/">{t('rentApartment.CEOText.p4.link')}</LinkWithLocale>
        {t('rentApartment.CEOText.p4.afterLink')}
      </p>

      <p>
        {t('rentApartment.CEOText.p5.beforeLink')}{' '}
        <LinkWithLocale href="/contacts/">{t('rentApartment.CEOText.p5.link')}</LinkWithLocale>
        {t('rentApartment.CEOText.p5.afterLink')}
      </p>
    </div>
  );
}
