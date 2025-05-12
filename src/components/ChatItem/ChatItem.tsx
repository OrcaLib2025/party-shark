import { Icon } from '../Icon'
import styles from './ChatItem.module.scss'
import { Timestamp } from 'firebase/firestore'

interface IChatItem {
    chatItem: {
        chatId: number,
        uid?: number,
        sender: string,
        lastMessage?: string,
        messageTime?: Timestamp,
    }
}

export const ChatItem: React.FC<IChatItem> = ({ chatItem }) => {
    return (
        <div className={styles.item}>
            <img className={styles.profileImg} src="src\assets\pictures\avatar.png" alt= 'картинка'/>
            <div className={styles.texts}>
                <div className={styles.sender}>{chatItem.sender}</div>
                <div className={styles.lastMessage}>{chatItem.lastMessage}</div>
            </div>
        </div>
    )
}