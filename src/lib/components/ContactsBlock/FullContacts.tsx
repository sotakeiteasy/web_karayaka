import styles from './ContactsBlock.module.scss';
import { ContactsBlock } from './ContactsBlock';
import { useTranslation } from 'next-export-i18n';

export function FullContacts() {
  const { t } = useTranslation();
  return (
    <>
      <p className={styles.workhours}>{t('header.workhours')}</p>

      <ContactsBlock showTraditional email phone></ContactsBlock>
    </>
  );
}
