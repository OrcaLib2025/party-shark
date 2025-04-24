import styles from "./ChatHeader.module.scss";

export const ChatHeader = () => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>Тестовый Чат</h2>
      <div className={styles.info}>
        <span className={styles.onlineStatus}>Online</span>
        <span className={styles.participants}>3 участника</span>
      </div>
    </div>
  );
};

export default ChatHeader;