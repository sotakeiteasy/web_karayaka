import { useTranslation, LinkWithLocale } from 'next-export-i18n';

import styles from './SearchCEOText.module.scss';
export default function PropertyForResidence() {
  const { t } = useTranslation();

  return (
    <div className={styles.CEOText}>
      <h1 className={styles.header}>{t('propertyForResidence.CEOText.title')}</h1>

      <p>
        {t('propertyForResidence.CEOText.p1.beforeLink')}{' '}
        <LinkWithLocale href="/offer">{t('propertyForResidence.CEOText.p1.link')}</LinkWithLocale>
        {t('propertyForResidence.CEOText.p1.afterLink')}
      </p>

      <p>
        {t('propertyForResidence.CEOText.p2.beforeLink')}{' '}
        <LinkWithLocale href="/">{t('propertyForResidence.CEOText.p2.link')}</LinkWithLocale>
        {t('propertyForResidence.CEOText.p2.afterLink')}
      </p>

      <ul className={styles.bulletList}>
        <li>{t('propertyForResidence.CEOText.bullets.0')}</li>
        <li>{t('propertyForResidence.CEOText.bullets.1')}</li>
        <li>{t('propertyForResidence.CEOText.bullets.2')}</li>
        <li>{t('propertyForResidence.CEOText.bullets.3')}</li>
        <li>{t('propertyForResidence.CEOText.bullets.4')}</li>
      </ul>

      <p>
        {t('propertyForResidence.CEOText.p3.beforeLink')}{' '}
        <LinkWithLocale href="/about-us">{t('propertyForResidence.CEOText.p3.link')}</LinkWithLocale>{' '}
        {t('propertyForResidence.CEOText.p3.afterLink')}
      </p>

      <p>
        {t('propertyForResidence.CEOText.p4.beforeLink')}{' '}
        <LinkWithLocale href="/contacts">{t('propertyForResidence.CEOText.p4.link')}</LinkWithLocale>
        {t('propertyForResidence.CEOText.p4.afterLink')}
      </p>
    </div>
  );
}
