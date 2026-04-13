import { useState, useRef } from 'react';
import BookCard from '../components/BookCard';
import { Spinner, ErrorMsg, EmptyState } from '../components/UI';
import { useSearch } from '../hooks/useSearch';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [input, setInput]       = useState('');
  const [type, setType]         = useState('title');
  const [page, setPage]         = useState(1);
  const { results, loading, error, query, total, search, clear } = useSearch();
  const resultsRef = useRef(null);

  const totalPages = Math.ceil(total / 12);
  const hasSearched = query.length > 0;

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setPage(1);
    search(input.trim(), type, 1);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
  }

  function handlePageChange(newPage) {
    setPage(newPage);
    search(query, type, newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleClear() {
    setInput('');
    setPage(1);
    clear();
  }

  return (
    <main id="main-content">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`container ${styles.heroInner}`}>
          <p className={styles.eyebrow}>Discover your next read</p>
          <h1 id="hero-title" className={styles.heroTitle}>
            Explore <em>millions</em><br />of books
          </h1>
          <p className={styles.heroSub}>
            Search the Open Library catalogue by title or author. Find details, covers, and save books to your personal reading list.
          </p>

          {/* ── Search form ─────────────────────────────────── */}
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            role="search"
            aria-label="Book search"
          >
            <fieldset className={styles.typeGroup}>
              <legend className="sr-only">Search by</legend>
              {['title', 'author'].map(t => (
                <label key={t} className={`${styles.typeLabel} ${type === t ? styles.typeActive : ''}`}>
                  <input
                    type="radio"
                    name="searchType"
                    value={t}
                    checked={type === t}
                    onChange={() => setType(t)}
                    className="sr-only"
                  />
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </label>
              ))}
            </fieldset>

            <div className={styles.inputRow}>
              <label htmlFor="search-input" className="sr-only">
                Search books by {type}
              </label>
              <input
                id="search-input"
                type="search"
                className={styles.input}
                placeholder={type === 'author' ? 'e.g. Haruki Murakami' : 'e.g. Norwegian Wood'}
                value={input}
                onChange={e => setInput(e.target.value)}
                aria-required="true"
                autoComplete="off"
              />
              <button
                type="submit"
                className={styles.searchBtn}
                disabled={loading || !input.trim()}
                aria-label="Search books"
              >
                {loading ? '…' : 'Search'}
              </button>
              {hasSearched && (
                <button
                  type="button"
                  className={styles.clearBtn}
                  onClick={handleClear}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* ── Results ──────────────────────────────────────────── */}
      <section
        ref={resultsRef}
        className={styles.results}
        aria-label="Search results"
        aria-live="polite"
        aria-busy={loading}
      >
        <div className="container">
          {loading && <Spinner label="Searching books…" />}

          {error && <ErrorMsg message={error} />}

          {!loading && hasSearched && !error && (
            <>
              <div className={styles.resultsHeader}>
                <p className={styles.resultsCount}>
                  {total > 0
                    ? <><strong>{total.toLocaleString()}</strong> results for "<em>{query}</em>"</>
                    : `No results for "${query}"`
                  }
                </p>
              </div>

              {results.length === 0 ? (
                <EmptyState
                  icon="📭"
                  title="No books found"
                  body="Try a different keyword or switch between title and author search."
                />
              ) : (
                <>
                  <div className={styles.grid} role="list">
                    {results.map((book, i) => (
                      <div key={book.key} role="listitem">
                        <BookCard book={book} index={i} />
                      </div>
                    ))}
                  </div>

                  {/* ── Pagination ──────────────────────────── */}
                  {totalPages > 1 && (
                    <nav className={styles.pagination} aria-label="Search results pages">
                      <button
                        className={styles.pageBtn}
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        aria-label="Previous page"
                      >
                        ← Previous
                      </button>
                      <span className={styles.pageInfo} aria-current="page">
                        Page {page} of {totalPages}
                      </span>
                      <button
                        className={styles.pageBtn}
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page >= totalPages}
                        aria-label="Next page"
                      >
                        Next →
                      </button>
                    </nav>
                  )}
                </>
              )}
            </>
          )}

          {!hasSearched && !loading && (
            <div className={styles.suggestions}>
              <p className={styles.suggestLabel}>Try searching for:</p>
              <div className={styles.chips}>
                {['Haruki Murakami', 'Harry Potter', 'George Orwell', 'Dune', 'The Alchemist'].map(s => (
                  <button
                    key={s}
                    className={styles.chip}
                    onClick={() => { setInput(s); setType(s.split(' ').length > 1 && ['Haruki Murakami','George Orwell'].includes(s) ? 'author' : 'title'); }}
                    type="button"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
