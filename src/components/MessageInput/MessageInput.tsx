import styles from "./MessageInput.module.scss";

export const MessageInput = () => {
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        className={styles.inputField}
        placeholder="Напишите сообщение..."
        disabled
        aria-label="Поле ввода сообщения"
      />
      <button type="button" className={styles.sendButton} disabled>
        Отправить
      </button>
    </div>
  );
};