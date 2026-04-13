import styles from './UI.module.css';

export function Spinner({ label = 'Loading…' }) {
  return (
    <div className={styles.spinnerWrap} role="status" aria-live="polite">
      <div className={styles.spinner} aria-hidden="true" />
      <span className={styles.spinnerLabel}>{label}</span>
    </div>
  );
}

export function ErrorMsg({ message }) {
  return (
    <div className={styles.error} role="alert" aria-live="assertive">
      <span aria-hidden="true">⚠️</span>
      <p>{message}</p>
    </div>
  );
}

export function EmptyState({ icon = '🔍', title, body }) {
  return (
    <div className={styles.empty} role="status">
      <span className={styles.emptyIcon} aria-hidden="true">{icon}</span>
      <h2 className={styles.emptyTitle}>{title}</h2>
      {body && <p className={styles.emptyBody}>{body}</p>}
    </div>
  );
}
