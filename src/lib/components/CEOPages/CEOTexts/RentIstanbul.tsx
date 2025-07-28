import { useTranslation, LinkWithLocale } from 'next-export-i18n';

import styles from './SearchCEOText.module.scss';
export default function RentIstanbul() {
  const { t } = useTranslation();

  return (
    <div className={styles.CEOText}>
      <h1 className={styles.header}>{t('rentIstanbul.CEOText.title')}</h1>

      <p>
        {t('rentIstanbul.CEOText.p1.beforeLink')}{' '}
        <LinkWithLocale href="/about-us">{t('rentIstanbul.CEOText.p1.link')}</LinkWithLocale>
        {t('rentIstanbul.CEOText.p1.afterLink')}
      </p>

      <p>{t('rentIstanbul.CEOText.p2.beforeLink')}</p>

      <ul className={styles.bulletList}>
        <li>{t('rentIstanbul.CEOText.bullets.0')}</li>
        <li>{t('rentIstanbul.CEOText.bullets.1')}</li>
        <li>{t('rentIstanbul.CEOText.bullets.2')}</li>
        <li>{t('rentIstanbul.CEOText.bullets.3')}</li>
        <li>{t('rentIstanbul.CEOText.bullets.4')}</li>
      </ul>

      <p>
        {t('rentIstanbul.CEOText.p3.beforeLink')}{' '}
        <LinkWithLocale href="/">{t('rentIstanbul.CEOText.p3.link')}</LinkWithLocale>
        {t('rentIstanbul.CEOText.p3.afterLink')}
      </p>

      <p>
        {t('rentIstanbul.CEOText.p4.beforeLink')}{' '}
        <LinkWithLocale href="/offer">{t('rentIstanbul.CEOText.p4.link')}</LinkWithLocale>{' '}
        {t('rentIstanbul.CEOText.p4.afterLink')}
      </p>

      <p>{t('rentIstanbul.CEOText.p5.beforeLink')}</p>
    </div>
  );
}
