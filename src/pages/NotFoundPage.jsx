import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <main id="main-content" className={styles.wrap}>
      <div className={styles.inner}>
        <span className={styles.code} aria-hidden="true">404</span>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.body}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className={styles.btn}>← Back to search</Link>
      </div>
    </main>
  );
}
