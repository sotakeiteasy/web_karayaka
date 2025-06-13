import styles from './RegInfo.module.scss';
import { companyInfo } from '@/lib/constants/companyData';
import { useLanguageQuery, useTranslation } from 'next-export-i18n';

const CompanyRegistrationInfo = ({ Req = true }: { Req?: boolean }) => {
  const [query] = useLanguageQuery();
  const locale = (query?.lang as 'ru' | 'en') || 'ru';
  const { t } = useTranslation();
  const {
    name,
    nameEn,
    address,
    addressEn,
    ogrn,
    inn,
    kpp,
    checkingAccount,
    bankName,
    bankNameEn,
    bik,
    correspondentAccount,
    director,
    directorEn,
  } = companyInfo;

  return (
    <div className={styles.main}>
      <h2>{Req ? t('regInfo.sectionTitleReqInfo') : t('regInfo.sectionTitleRegInfo')}</h2>
      <p>{locale === 'ru' ? name : nameEn}</p>
      <div className={styles.regInfo}>
        <table className={styles.infoTable}>
          <tbody>
            <tr>
              <td>{t('regInfo.legalAddress')}</td>
              <td>{locale === 'ru' ? address : addressEn}</td>
            </tr>
            <tr>
              <td>{t('regInfo.inn')}</td>
              <td>{inn}</td>
            </tr>
            <tr>
              <td>{t('regInfo.kpp')}</td>
              <td>{kpp}</td>
            </tr>
            <tr>
              <td>{t('regInfo.director')}</td>
              <td>{locale === 'ru' ? director : directorEn}</td>
            </tr>
          </tbody>
        </table>
        <table className={styles.infoTable}>
          <tbody>
            <tr>
              <td>{t('regInfo.checkingAccount')}</td>
              <td>{checkingAccount}</td>
            </tr>
            <tr>
              <td>{t('regInfo.ogrn')}</td>
              <td>{ogrn}</td>
            </tr>
            <tr>
              <td>
                {t('regInfo.bankName')} {locale === 'ru' ? bankName : bankNameEn}{' '}
              </td>
              <td>
                {t('regInfo.bik')} {bik}
              </td>
            </tr>
            {/* <tr>
              <td>{t('regInfo.bik')}</td>
              <td></td>
            </tr> */}
            {correspondentAccount && (
              <tr>
                <td>{t('regInfo.correspondentAccount')}</td>
                <td>{correspondentAccount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyRegistrationInfo;
