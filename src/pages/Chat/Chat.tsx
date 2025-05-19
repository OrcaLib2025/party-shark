import styles from './Chat.module.scss';
import { ChatList } from './ChatList';

export const Chat = () => {
    return (
        <div className={styles.container}>
            <ChatList />

            {/* <ChatHeader />
            <MessageList />
            <MessageInput /> */}
        </div>
    );
};
