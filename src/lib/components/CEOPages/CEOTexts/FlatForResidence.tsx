import { useTranslation, LinkWithLocale } from 'next-export-i18n';
import styles from './SearchCEOText.module.scss';
export default function FlatForResidence() {
  const { t } = useTranslation();

  return (
    <div className={styles.CEOText}>
      <h1 className={styles.header}>{t('flatForResidence.CEOText.title')}</h1>

      <p>
        {t('flatForResidence.CEOText.p1.beforeLink')}{' '}
        <LinkWithLocale href="/">{t('flatForResidence.CEOText.p1.link')}</LinkWithLocale>
        {t('flatForResidence.CEOText.p1.afterLink')}
      </p>

      <p>
        {t('flatForResidence.CEOText.p2.beforeLink')}{' '}
        <LinkWithLocale href="/offer">{t('flatForResidence.CEOText.p2.link')}</LinkWithLocale>
        {t('flatForResidence.CEOText.p2.afterLink')}
      </p>

      <ul className={styles.bulletList}>
        <li>{t('flatForResidence.CEOText.bullets.0')}</li>
        <li>{t('flatForResidence.CEOText.bullets.1')}</li>
        <li>{t('flatForResidence.CEOText.bullets.2')}</li>
        <li>{t('flatForResidence.CEOText.bullets.3')}</li>
        <li>{t('flatForResidence.CEOText.bullets.4')}</li>
      </ul>

      <p>{t('flatForResidence.CEOText.p3.beforeLink')}</p>

      <p>
        <LinkWithLocale href="/contacts">{t('flatForResidence.CEOText.p4.link')}</LinkWithLocale>
        {t('flatForResidence.CEOText.p4.afterLink')}
      </p>
    </div>
  );
}
