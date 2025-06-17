import { LinkWithLocale } from 'next-export-i18n';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import styles from './ArticleCard.module.scss';

export function ArticleCard({
  id,
  title,
  date,
  excerpt,
  direction = 'row',
}: {
  id: string;
  title: string;
  date: string;
  excerpt: string | undefined;
  direction?: 'row' | 'column';
}) {
  return (
    <div key={id} className={`${styles.articleCard} ${direction === 'column' ? styles.columnReverse : ''}`}>
      <LinkWithLocale href={`/blog/${id}`}>
        <div className={styles.articleImage}>
          <Image
            src={getImageUrl(`assets/images/articles/${id}.jpg`)}
            fill={true}
            alt={title}
            title={title}
            sizes="100%"
            style={{
              objectFit: 'cover',
              borderRadius: '15px 0px 0px 15px',
            }}
            loading="eager"
            priority
          />
        </div>
        <section className={styles.articlePreview}>
          <h2 className={styles.articleTitle}>{title}</h2>
          <time dateTime={date} className={styles.articleDate}>
            {date}
          </time>
          {excerpt && (
            <div className={styles.articleText}>
              <p>{excerpt}</p>
            </div>
          )}
        </section>
      </LinkWithLocale>
    </div>
  );
}
