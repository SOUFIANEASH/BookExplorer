import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        <p className={styles.left}>
          <span className={styles.logo}>📚 BookExplorer</span>
          <span className={styles.sep}>·</span>
          Data provided by{' '}
          <a
            href="https://openlibrary.org"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Open Library API
          </a>
        </p>
        <p className={styles.right}>
          Soufiane Achouch — IPBeja 2026
        </p>
      </div>
    </footer>
  );
}
