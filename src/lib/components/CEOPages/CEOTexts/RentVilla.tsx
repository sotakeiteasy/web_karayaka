import { useTranslation, LinkWithLocale } from 'next-export-i18n';

import styles from './SearchCEOText.module.scss';

export default function RentCEOText() {
  const { t } = useTranslation();

  return (
    <div className={styles.CEOText}>
      <h1 className={styles.header}>{t('rentVilla.CEOText.title')}</h1>

      <p>
        {t('rentVilla.CEOText.p1.beforeLink')}{' '}
        <LinkWithLocale href="/">{t('rentVilla.CEOText.p1.link')}</LinkWithLocale> {t('rentVilla.CEOText.p1.afterLink')}
      </p>

      <p>{t('rentVilla.CEOText.p2')}</p>

      <ul className={styles.list}>
        <li>{t('rentVilla.CEOText.bullets.0')}</li>
        <li>{t('rentVilla.CEOText.bullets.1')}</li>
        <li>{t('rentVilla.CEOText.bullets.2')}</li>
        <li>{t('rentVilla.CEOText.bullets.3')}</li>
      </ul>

      <p>
        {t('rentVilla.CEOText.p3.beforeLink')}{' '}
        <LinkWithLocale href="/rent/">{t('rentVilla.CEOText.p3.link')}</LinkWithLocale>{' '}
        {t('rentVilla.CEOText.p3.afterLink')}
      </p>

      <p>
        {t('rentVilla.CEOText.p4.beforeLink')}{' '}
        <LinkWithLocale href="/about-us/">{t('rentVilla.CEOText.p4.link')}</LinkWithLocale>
        {t('rentVilla.CEOText.p4.afterLink')}
      </p>

      <p>
        {t('rentVilla.CEOText.p5.beforeLink')}{' '}
        <LinkWithLocale href="/contacts/">{t('rentVilla.CEOText.p5.link')}</LinkWithLocale>
        {t('rentVilla.CEOText.p5.afterLink')}
      </p>
    </div>
  );
}
