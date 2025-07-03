import { useTranslation, LinkWithLocale } from 'next-export-i18n';

import styles from './SearchCEOText.module.scss';

export default function CEOsTexts() {
  const { t } = useTranslation();

  return (
    <div className={styles.CEOText}>
      <h1 className={styles.header}>{t('buyFlat.CEOText.title')}</h1>

      <p>
        {t('buyFlat.CEOText.p1.beforeLink')} <LinkWithLocale href="/">{t('buyFlat.CEOText.p1.link')}</LinkWithLocale>{' '}
        {t('buyFlat.CEOText.p1.afterLink')}
      </p>

      <p>
        {t('buyFlat.CEOText.p2.beforeLink')}{' '}
        <LinkWithLocale href="/about-us/">{t('buyFlat.CEOText.p2.link')}</LinkWithLocale>{' '}
        {t('buyFlat.CEOText.p2.afterLink')}
      </p>

      <ul className={styles.list}>
        <li>{t('buyFlat.CEOText.bullets.0')}</li>
        <li>{t('buyFlat.CEOText.bullets.1')}</li>
        <li>{t('buyFlat.CEOText.bullets.2')}</li>
        <li>{t('buyFlat.CEOText.bullets.3')}</li>
        <li>{t('buyFlat.CEOText.bullets.4')}</li>
      </ul>

      <p>
        {t('buyFlat.CEOText.p3.beforeLink')}{' '}
        <LinkWithLocale href="/contacts/">{t('buyFlat.CEOText.p3.link')}</LinkWithLocale>
        {t('buyFlat.CEOText.p3.afterLink')}
      </p>
    </div>
  );
}
