import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useReadingList } from '../context/ReadingListContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { books } = useReadingList();
  const location  = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={styles.header} role="banner">
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} aria-label="BookExplorer home">
          <span className={styles.logoIcon} aria-hidden="true">📚</span>
          <span className={styles.logoText}>Book<em>Explorer</em></span>
        </Link>

        <button
          className={styles.burger}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>

        <nav
          id="main-nav"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
          role="navigation"
          aria-label="Main navigation"
        >
          <Link
            to="/"
            className={`${styles.link} ${isActive('/') ? styles.active : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Search
          </Link>
          <Link
            to="/reading-list"
            className={`${styles.link} ${isActive('/reading-list') ? styles.active : ''}`}
            onClick={() => setMenuOpen(false)}
            aria-label={`My Reading List, ${books.length} book${books.length !== 1 ? 's' : ''}`}
          >
            My Reading List
            {books.length > 0 && (
              <span className={styles.badge} aria-hidden="true">{books.length}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
