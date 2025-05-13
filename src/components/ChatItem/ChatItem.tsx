import styles from './ChatItem.module.scss'
import { Timestamp } from 'firebase/firestore'
import { formatTime } from '../../utils/services/timeUitl'

interface IChatItem {
    chatItem: {
        chatId: number,
        uid?: number,
        sender: string,
        lastMessage?: string,
        messageTime?: Timestamp,
        isOnline?: boolean;
        unreadCount?: number;
        isGroup?: boolean;
        profilePicture?: string;
        type: string;
    }
    isActive?: boolean;
    onClick?: () => void;
}

export const ChatItem: React.FC<IChatItem> = ({ chatItem, isActive = false, onClick }) => {
    return (
        <div
            className={`${styles.item} ${isActive ? styles.active : ''}`}
            onClick={onClick}
        >
            <div className={styles.avatarWrapper}>
                <img
                    className={styles.profileImg}
                    src={chatItem.profilePicture}
                    alt='картинка' />
                {chatItem.isOnline && !chatItem.isGroup && (
                    <span className={styles.onlineIndicator}></span>
                )}
            </div>
            <div className={styles.texts}>
                <div className={styles.senderRow}>
                    <span className={styles.sender}>{chatItem.sender}</span>
                    {chatItem.messageTime && (
                        <span className={styles.time}>
                            {formatTime(chatItem.messageTime)}
                        </span>
                    )}
                </div>
                <div className={styles.lastMessageRow}>
                    <p className={styles.lastMessage}>
                        {chatItem.lastMessage}
                    </p>
                    {chatItem.unreadCount ? (
                        <span className={styles.unreadBadge}>{chatItem.unreadCount}</span>
                    ): null}
                </div>
            </div>
        </div>
    )
}