import { useTranslation, LinkWithLocale } from 'next-export-i18n';
import styles from './SearchCEOText.module.scss';

export default function FlatsAlanyaCEOText() {
  const { t } = useTranslation();

  return (
    <div className={styles.CEOText}>
      <h1 className={styles.header}>{t('flatsAlanya.CEOText.title')}</h1>

      <p>
        {t('flatsAlanya.CEOText.p1.beforeLink')}{' '}
        <LinkWithLocale href="/about-us">{t('flatsAlanya.CEOText.p1.link')}</LinkWithLocale>
        {t('flatsAlanya.CEOText.p1.afterLink')}
      </p>

      <p>
        {t('flatsAlanya.CEOText.p2.beforeLink')}{' '}
        <LinkWithLocale href="/buy">{t('flatsAlanya.CEOText.p2.link')}</LinkWithLocale>{' '}
        {t('flatsAlanya.CEOText.p2.afterLink')}
      </p>

      <ul className={styles.bulletList}>
        <li>{t('flatsAlanya.CEOText.bullets.0')}</li>
        <li>{t('flatsAlanya.CEOText.bullets.1')}</li>
        <li>{t('flatsAlanya.CEOText.bullets.2')}</li>
        <li>{t('flatsAlanya.CEOText.bullets.3')}</li>
      </ul>

      <p>
        {t('flatsAlanya.CEOText.p3.beforeLink')}{' '}
        <LinkWithLocale href="/">{t('flatsAlanya.CEOText.p3.link')}</LinkWithLocale>
        {t('flatsAlanya.CEOText.p3.afterLink')}
      </p>

      <p>
        {t('flatsAlanya.CEOText.p4.beforeLink')}{' '}
        <LinkWithLocale href="/contacts">{t('flatsAlanya.CEOText.p4.link')}</LinkWithLocale>{' '}
        {t('flatsAlanya.CEOText.p4.afterLink')}
      </p>
    </div>
  );
}
