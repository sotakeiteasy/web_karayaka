import { useTranslation, LinkWithLocale } from 'next-export-i18n';
import styles from './SearchCEOText.module.scss';
export default function LandInvestmentsCEOText() {
  const { t } = useTranslation();

  return (
    <div className={styles.CEOText}>
      <h1 className={styles.header}>{t('landInvestments.CEOText.title')}</h1>

      <p>
        {t('landInvestments.CEOText.p1.beforeLink')}{' '}
        <LinkWithLocale href="/offer">{t('landInvestments.CEOText.p1.link')}</LinkWithLocale>
        {t('landInvestments.CEOText.p1.afterLink')}
      </p>

      <p>
        <LinkWithLocale href="/about-us">{t('landInvestments.CEOText.p2.link')}</LinkWithLocale>{' '}
        {t('landInvestments.CEOText.p2.afterLink')}
      </p>

      <ul className={styles.bulletList}>
        <li>{t('landInvestments.CEOText.bullets.0')}</li>
        <li>{t('landInvestments.CEOText.bullets.1')}</li>
        <li>{t('landInvestments.CEOText.bullets.2')}</li>
        <li>{t('landInvestments.CEOText.bullets.3')}</li>
        <li>{t('landInvestments.CEOText.bullets.4')}</li>
      </ul>

      <p>
        {t('landInvestments.CEOText.p3.beforeLink')}{' '}
        <LinkWithLocale href="/">{t('landInvestments.CEOText.p3.link')}</LinkWithLocale>
        {t('landInvestments.CEOText.p3.afterLink')}
      </p>

      <p>
        {t('landInvestments.CEOText.p4.beforeLink')}{' '}
        <LinkWithLocale href="/contacts">{t('landInvestments.CEOText.p4.link')}</LinkWithLocale>
        {t('landInvestments.CEOText.p4.afterLink')}
      </p>
    </div>
  );
}
