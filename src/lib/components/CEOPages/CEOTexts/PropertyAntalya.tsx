import { useTranslation, LinkWithLocale } from 'next-export-i18n';

import styles from './SearchCEOText.module.scss';

export default function RentCEOText() {
  const { t } = useTranslation();

  return (
    <div className={styles.CEOText}>
      <h1 className={styles.header}>{t('antalya.CEOText.title')}</h1>

      <p>
        {t('antalya.CEOText.p1.beforeLink')} <LinkWithLocale href="/">{t('antalya.CEOText.p1.link')}</LinkWithLocale>{' '}
        {t('antalya.CEOText.p1.afterLink')}
      </p>

      <p>
        {t('antalya.CEOText.p2.beforeLink')}{' '}
        <LinkWithLocale href="/offer/">{t('antalya.CEOText.p2.link')}</LinkWithLocale>{' '}
        {t('antalya.CEOText.p2.afterLink')}
      </p>

      <ul className={styles.bulletList}>
        <li>{t('antalya.CEOText.bullets.0')}</li>
        <li>{t('antalya.CEOText.bullets.1')}</li>
        <li>{t('antalya.CEOText.bullets.2')}</li>
      </ul>
      <h2 className={styles.subheader}>{t('antalya.CEOText.h3')}</h2>
      <ul className={styles.list}>
        <li>{t('antalya.CEOText.bullets.3')}</li>
        <li>{t('antalya.CEOText.bullets.4')}</li>
        <li>{t('antalya.CEOText.bullets.5')}</li>
        <li>{t('antalya.CEOText.bullets.6')}</li>
        <li>{t('antalya.CEOText.bullets.7')}</li>
      </ul>

      <p>
        {t('antalya.CEOText.p3.beforeLink')}{' '}
        <LinkWithLocale href="/contacts/">{t('antalya.CEOText.p3.link')}</LinkWithLocale>{' '}
        {t('antalya.CEOText.p3.afterLink')}
      </p>
    </div>
  );
}
