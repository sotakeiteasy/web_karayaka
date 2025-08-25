import styles from './SeeAlsoCEO.module.scss';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { useContext } from 'react';
import { DeviceContext } from '@/lib/contexts/DeviceContext';
import Link from 'next/link';
type Page = {
  title: string;
  link: string;
  image: string;
};

type SeeAlsoCEOProps = {
  pages: Page[];
  rootLink: string;
};
export default function SeeAlsoCEO({ pages, rootLink }: SeeAlsoCEOProps) {
  const { isMobile } = useContext(DeviceContext);
  if (!isMobile)
    return (
      <div className={styles.articlesBlock}>
        <h2 className={styles.header}>Смотрите также</h2>
        <div className={styles.articlesWrapper}>
          {pages.map(({ title, link, image }: Page) => (
            <div key={title} className={styles.articleLink}>
              <Link href={`${rootLink}${link}`}>
                <div className={styles.articleImage}>
                  <Image
                    src={getImageUrl(`${image}`)}
                    fill={true}
                    alt={title}
                    title={title}
                    draggable="false"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.articleDescription}>
                  <h2 className={styles.articleTitle}>{title}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  else return null;
}
