import { useTranslation, LinkWithLocale } from 'next-export-i18n';

import styles from './SearchCEOText.module.scss';

export default function VillaAntalya() {
  const { t } = useTranslation();

  return (
    <div className={styles.CEOText}>
      <h1 className={styles.header}>{t('villaAntalya.CEOText.title')}</h1>

      <p>
        {t('villaAntalya.CEOText.p1.beforeLink')}{' '}
        <LinkWithLocale href="/">{t('villaAntalya.CEOText.p1.link')}</LinkWithLocale>
        {t('villaAntalya.CEOText.p1.afterLink')}
      </p>

      <p>
        {t('villaAntalya.CEOText.p2.beforeLink')}{' '}
        <LinkWithLocale href="/buy">{t('villaAntalya.CEOText.p2.link')}</LinkWithLocale>{' '}
        {t('villaAntalya.CEOText.p2.afterLink')}
      </p>

      <ul className={styles.bulletList}>
        <li>{t('villaAntalya.CEOText.bullets.0')}</li>
        <li>{t('villaAntalya.CEOText.bullets.1')}</li>
        <li>{t('villaAntalya.CEOText.bullets.2')}</li>
        <li>{t('villaAntalya.CEOText.bullets.3')}</li>
        <li>{t('villaAntalya.CEOText.bullets.4')}</li>
      </ul>

      <p>
        {t('villaAntalya.CEOText.p3.beforeLink')}{' '}
        <LinkWithLocale href="/rent">{t('villaAntalya.CEOText.p3.link')}</LinkWithLocale>{' '}
        {t('villaAntalya.CEOText.p3.afterLink')}
      </p>

      <p>
        {t('villaAntalya.CEOText.p4.beforeLink')}{' '}
        <LinkWithLocale href="/contacts">{t('villaAntalya.CEOText.p4.link')}</LinkWithLocale>
        {t('villaAntalya.CEOText.p4.afterLink')}
      </p>
    </div>
  );
}
