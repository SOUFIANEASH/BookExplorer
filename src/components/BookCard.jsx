import { Link } from 'react-router-dom';
import { getCoverUrl } from '../hooks/useSearch';
import styles from './BookCard.module.css';

export default function BookCard({ book, index = 0 }) {
  const cover   = getCoverUrl(book.cover_i, 'M');
  const workId  = book.key?.replace('/works/', '');
  const authors = book.author_name?.slice(0, 2).join(', ') || 'Unknown author';
  const year    = book.first_publish_year || '';

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Link
        to={`/book/${workId}`}
        className={styles.inner}
        aria-label={`${book.title} by ${authors}${year ? `, ${year}` : ''}`}
      >
        <div className={styles.coverWrap}>
          {cover ? (
            <img
              src={cover}
              alt={`Cover of ${book.title}`}
              className={styles.cover}
              loading="lazy"
              width="128"
              height="192"
            />
          ) : (
            <div className={styles.noCover} aria-hidden="true">
              <span>📖</span>
            </div>
          )}
          <div className={styles.overlay} aria-hidden="true">View details</div>
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{book.title}</h3>
          <p  className={styles.author}>{authors}</p>
          {year && <p className={styles.year}>{year}</p>}
        </div>
      </Link>
    </article>
  );
}
