import { useTranslation } from 'next-export-i18n';
import Image from 'next/image';
import styles from './CEOImage.module.scss';
import { getImageUrl } from '@/lib/utils';
export default function CEOImage({ imageSrc, title }: { imageSrc: string; title: string }) {
  const { t } = useTranslation();

  return (
    <div className={styles.imageContainer}>
      <Image
        src={getImageUrl(imageSrc)}
        alt={t(title)}
        title={t(title)}
        // width={900}
        // height={400}
        fill={true}
        style={{
          objectFit: 'cover',
        }}
      />
      <div className={styles.textBackdrop}></div>
    </div>
  );
}
