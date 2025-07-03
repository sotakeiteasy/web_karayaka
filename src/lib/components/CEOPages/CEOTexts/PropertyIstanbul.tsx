import { useTranslation, LinkWithLocale } from 'next-export-i18n';
import styles from './SearchCEOText.module.scss';
export default function RentCEOText() {
  const { t } = useTranslation();

  return (
    <div className={styles.CEOText}>
      <h1 className={styles.header}>{t('istanbul.CEOText.title')}</h1>

      <p>
        {t('istanbul.CEOText.p1.beforeLink')} <LinkWithLocale href="/">{t('istanbul.CEOText.p1.link')}</LinkWithLocale>{' '}
        {t('istanbul.CEOText.p1.afterLink')}
      </p>

      <p>
        {t('istanbul.CEOText.p2.beforeLink')}{' '}
        <LinkWithLocale href="/about-us/">{t('istanbul.CEOText.p2.link')}</LinkWithLocale>
        {t('istanbul.CEOText.p2.afterLink')}
      </p>
      <h2 className={styles.subheader}>{t('istanbul.CEOText.h3')}</h2>
      <ul className={styles.list}>
        <li>{t('istanbul.CEOText.bullets.0')}</li>
        <li>{t('istanbul.CEOText.bullets.1')}</li>
        <li>{t('istanbul.CEOText.bullets.2')}</li>
        <li>{t('istanbul.CEOText.bullets.3')}</li>
      </ul>

      <p>
        {t('istanbul.CEOText.p3.beforeLink')}{' '}
        <LinkWithLocale href="/contacts/">{t('istanbul.CEOText.p3.link')}</LinkWithLocale>
        {t('istanbul.CEOText.p3.afterLink')}
      </p>

      <p>
        {t('istanbul.CEOText.p4.beforeLink')}{' '}
        <LinkWithLocale href="/discounts/">{t('istanbul.CEOText.p4.link')}</LinkWithLocale>{' '}
        {t('istanbul.CEOText.p4.afterLink')}
      </p>
    </div>
  );
}
