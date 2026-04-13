import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchBookDetail, fetchAuthor, getCoverUrl } from '../hooks/useSearch';
import { useReadingList } from '../context/ReadingListContext';
import { Spinner, ErrorMsg } from '../components/UI';
import styles from './BookDetailPage.module.css';

export default function BookDetailPage() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const { addBook, removeBook, isInList } = useReadingList();

  const [book,    setBook]    = useState(null);
  const [author,  setAuthor]  = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [toast,   setToast]   = useState(null);

  const workKey = `/works/${id}`;
  const saved   = isInList(workKey);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchBookDetail(workKey);
        if (cancelled) return;
        setBook(data);
        // fetch first author if available
        if (data.authors?.[0]?.author?.key) {
          const a = await fetchAuthor(data.authors[0].author.key);
          if (!cancelled) setAuthor(a);
        }
      } catch {
        if (!cancelled) setError('Could not load book details. Please try again.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function handleToggle() {
    if (!book) return;
    const cover = book.covers?.[0];
    const bookData = {
      key:    workKey,
      title:  book.title,
      author: author?.name || 'Unknown author',
      cover_i: cover || null,
    };
    if (saved) {
      removeBook(workKey);
      showToast(`"${book.title}" removed from your reading list.`);
    } else {
      addBook(bookData);
      showToast(`"${book.title}" added to your reading list!`);
    }
  }

  // Extract description text
  function getDescription(desc) {
    if (!desc) return null;
    if (typeof desc === 'string') return desc;
    if (desc.value) return desc.value;
    return null;
  }

  const description = book ? getDescription(book.description) : null;
  const cover       = book?.covers?.[0] ? getCoverUrl(book.covers[0], 'L') : null;
  const subjects    = book?.subjects?.slice(0, 10) || [];

  return (
    <main id="main-content">
      {/* ── Breadcrumb ─────────────────────────────────────── */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <div className="container">
          <Link to="/" className={styles.bcLink}>← Back to search</Link>
        </div>
      </nav>

      <div className="container">
        {loading && <Spinner label="Loading book details…" />}
        {error   && <ErrorMsg message={error} />}

        {book && !loading && (
          <article className={`${styles.detail} fade-up`} aria-labelledby="book-title">
            {/* ── Cover column ─────────────────────────────── */}
            <div className={styles.coverCol}>
              <div className={styles.coverFrame}>
                {cover ? (
                  <img
                    src={cover}
                    alt={`Cover of ${book.title}`}
                    className={styles.cover}
                    width="280"
                  />
                ) : (
                  <div className={styles.noCover} aria-label="No cover available">
                    <span aria-hidden="true">📖</span>
                    <p>No cover</p>
                  </div>
                )}
              </div>

              {/* ── CTA ────────────────────────────────────── */}
              <button
                className={`${styles.cta} ${saved ? styles.ctaSaved : ''}`}
                onClick={handleToggle}
                aria-pressed={saved}
                aria-label={saved
                  ? `Remove ${book.title} from reading list`
                  : `Add ${book.title} to reading list`}
              >
                {saved ? '✓ In your reading list' : '+ Add to Reading List'}
              </button>

              {saved && (
                <Link to="/reading-list" className={styles.viewList}>
                  View my reading list →
                </Link>
              )}
            </div>

            {/* ── Meta column ──────────────────────────────── */}
            <div className={styles.metaCol}>
              <h1 id="book-title" className={styles.title}>{book.title}</h1>

              {author && (
                <p className={styles.authorLine}>
                  <span className={styles.metaLabel}>Author</span>
                  <span className={styles.authorName}>{author.name}</span>
                </p>
              )}

              {book.first_publish_date && (
                <p className={styles.metaRow}>
                  <span className={styles.metaLabel}>First published</span>
                  <span>{book.first_publish_date}</span>
                </p>
              )}

              {description && (
                <div className={styles.desc}>
                  <h2 className={styles.descTitle}>About this book</h2>
                  <p>{description.slice(0, 800)}{description.length > 800 ? '…' : ''}</p>
                </div>
              )}

              {subjects.length > 0 && (
                <div className={styles.subjects}>
                  <h2 className={styles.subjectsTitle}>Subjects</h2>
                  <ul className={styles.tagList} aria-label="Book subjects">
                    {subjects.map(s => (
                      <li key={s} className={styles.tag}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={styles.links}>
                <a
                  href={`https://openlibrary.org${workKey}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.extLink}
                  aria-label={`View ${book.title} on Open Library (opens in new tab)`}
                >
                  View on Open Library ↗
                </a>
              </div>
            </div>
          </article>
        )}
      </div>

      {/* ── Toast notification ─────────────────────────────── */}
      {toast && (
        <div
          className={styles.toast}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {toast}
        </div>
      )}
    </main>
  );
}
