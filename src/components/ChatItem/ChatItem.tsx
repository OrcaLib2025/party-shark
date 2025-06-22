import { IChatItem } from '../../utils/models/Chat';
import { formatTime } from '../../utils/timeUitl';

import styles from './ChatItem.module.scss';

interface ChatItemProps {
    chatItem: IChatItem;
    isActive?: boolean;
    onClick?: () => void;
}

export const ChatItem: React.FC<ChatItemProps> = ({ chatItem, isActive = false, onClick }) => {
    return (
        <div
            className={`${styles.item} ${isActive ? styles.active : ''}`}
            onClick={onClick}
        >
            <div className={styles.avatarWrapper}>
                {chatItem.profilePicture
                    ? (
                        <img
                            className={styles.profileImg}
                            src={chatItem.profilePicture}
                            alt='картинка' />
                    )
                    : (
                        <div className={styles.defaultAvatar}>
                            {chatItem.sender ? chatItem.sender.charAt(0).toUpperCase() : 'U'}
                        </div>
                    )}
                {chatItem.isOnline && chatItem.type !== 'group' && (
                    <span className={styles.onlineIndicator}></span>
                )}
            </div>
            <div className={styles.texts}>
                <div className={styles.senderRow}>
                    <span className={styles.sender}>{chatItem.sender}</span>
                    {chatItem.lastMessage?.timestamp && (
                        <span className={styles.time}>
                            {formatTime(chatItem.lastMessage.timestamp)}
                        </span>
                    )}
                </div>
                <div className={styles.lastMessageRow}>
                    <p className={styles.lastMessage}>
                        {chatItem.lastMessage?.text}
                    </p>
                    {chatItem.unreadCount
                        ? (
                            <span className={styles.unreadBadge}>{chatItem.unreadCount}</span>
                        )
                        : null}
                </div>
            </div>
        </div>
    );
};
