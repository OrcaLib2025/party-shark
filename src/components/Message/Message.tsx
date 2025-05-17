import styles from "./Message.module.scss";

interface IMessage {
    message: {
        id: number;
        text: string;
        sender: string;
        timestamp: string;
        isCurrentUser: boolean;
        image?: string | undefined;
    }
}

export const Message: React.FC<IMessage> = ({ message }) => {
  const messageClasses = `${styles.message} ${
    message.isCurrentUser ? styles.currentUser : styles.notCurrentUser
  }`;

  return (
    <div className={messageClasses}>
      {!message.isCurrentUser && (
        <div className={styles.sender}>{message.sender}</div>
      )}
      <div className={styles.content}>
        {message.image && (
          <img className= {styles.textImage} src= {message.image} />
        )}
        <div className={styles.text}>{message.text}</div>
        <div className={styles.time}>{message.timestamp}</div>
      </div>
    </div>
  );
};
