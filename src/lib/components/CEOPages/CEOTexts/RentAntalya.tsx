import { useTranslation, LinkWithLocale } from 'next-export-i18n';

import styles from './SearchCEOText.module.scss';

export default function RentCEOText() {
  const { t } = useTranslation();

  return (
    <div className={styles.CEOText}>
      <h1 className={styles.header}>{t('antalyaRent.CEOText.title')}</h1>

      <p>
        {t('antalyaRent.CEOText.p1.beforeLink')}{' '}
        <LinkWithLocale href="/">{t('antalyaRent.CEOText.p1.link')}</LinkWithLocale>
        {t('antalyaRent.CEOText.p1.afterLink')}
      </p>

      <p>
        {t('antalyaRent.CEOText.p2.beforeLink')}{' '}
        <LinkWithLocale href="/rent/">{t('antalyaRent.CEOText.p2.link')}</LinkWithLocale>
        {t('antalyaRent.CEOText.p2.afterLink')}
      </p>

      <ul className={styles.list}>
        <li>{t('antalyaRent.CEOText.bullets.0')}</li>
        <li>{t('antalyaRent.CEOText.bullets.1')}</li>
        <li>{t('antalyaRent.CEOText.bullets.2')}</li>
        <li>{t('antalyaRent.CEOText.bullets.3')}</li>
        <li>{t('antalyaRent.CEOText.bullets.4')}</li>
      </ul>

      <p>
        {t('antalyaRent.CEOText.p3.beforeLink')}{' '}
        <LinkWithLocale href="/discounts/">{t('antalyaRent.CEOText.p3.link')}</LinkWithLocale>{' '}
        {t('antalyaRent.CEOText.p3.afterLink')}
      </p>

      <p>
        {t('antalyaRent.CEOText.p4.beforeLink')}{' '}
        <LinkWithLocale href="/contacts/">{t('antalyaRent.CEOText.p4.link')}</LinkWithLocale>
        {t('antalyaRent.CEOText.p4.afterLink')}
      </p>
    </div>
  );
}
