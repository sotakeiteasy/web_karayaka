import styles from './CookiesConsent.module.scss';
import { useTranslation } from 'next-export-i18n';

export function CookieConsent({ visible, setVisible }: any) {
  const { t } = useTranslation();

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
  };

  return (
    <div className={`${styles.cookieConsent} ${visible ? styles.active : ''}`}>
      <p className={styles.message}>
        {t('cookies.disclaimer')}
        <br />
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" aria-label={t('cookies.policyAreaLabel')}>
          <span>{t('cookies.policy')}</span>
        </a>
      </p>
      <button className={styles.acceptButton} onClick={handleAccept}>
        {t('cookies.accept')}
      </button>
    </div>
  );
}
