import { Link } from 'react-router-dom';
import { useReadingList } from '../context/ReadingListContext';
import { getCoverUrl } from '../hooks/useSearch';
import { EmptyState } from '../components/UI';
import styles from './ReadingListPage.module.css';

export default function ReadingListPage() {
  const { books, removeBook } = useReadingList();

  return (
    <main id="main-content">
      <div className={`container ${styles.wrapper}`}>
        <header className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>My Reading List</h1>
            <p className={styles.pageSub}>
              {books.length > 0
                ? `${books.length} book${books.length !== 1 ? 's' : ''} saved`
                : 'Your personal reading list'}
            </p>
          </div>
          {books.length > 0 && (
            <Link to="/" className={styles.addMore}>
              + Find more books
            </Link>
          )}
        </header>

        {books.length === 0 ? (
          <div className={styles.emptyWrap}>
            <EmptyState
              icon="📚"
              title="Your reading list is empty"
              body="Search for books and click 'Add to Reading List' on any book detail page to save them here."
            />
            <Link to="/" className={styles.startBtn}>Start searching →</Link>
          </div>
        ) : (
          <ul className={styles.list} aria-label="Your reading list">
            {books.map((book, i) => {
              const cover   = getCoverUrl(book.cover_i, 'M');
              const workId  = book.key?.replace('/works/', '');
              const savedDate = book.savedAt
                ? new Date(book.savedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                : null;

              return (
                <li
                  key={book.key}
                  className={styles.item}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <Link to={`/book/${workId}`} className={styles.coverLink} tabIndex={-1} aria-hidden="true">
                    <div className={styles.coverWrap}>
                      {cover ? (
                        <img
                          src={cover}
                          alt={`Cover of ${book.title}`}
                          className={styles.cover}
                          loading="lazy"
                          width="64"
                          height="96"
                        />
                      ) : (
                        <div className={styles.noCover} aria-hidden="true">📖</div>
                      )}
                    </div>
                  </Link>

                  <div className={styles.info}>
                    <Link to={`/book/${workId}`} className={styles.titleLink}>
                      <h2 className={styles.bookTitle}>{book.title}</h2>
                    </Link>
                    {book.author && (
                      <p className={styles.bookAuthor}>{book.author}</p>
                    )}
                    {savedDate && (
                      <p className={styles.savedDate}>
                        <span aria-label="Saved on">Saved {savedDate}</span>
                      </p>
                    )}
                  </div>

                  <div className={styles.actions}>
                    <Link
                      to={`/book/${workId}`}
                      className={styles.viewBtn}
                      aria-label={`View details for ${book.title}`}
                    >
                      View
                    </Link>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeBook(book.key)}
                      aria-label={`Remove ${book.title} from reading list`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
