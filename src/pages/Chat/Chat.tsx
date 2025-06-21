import { ChatList } from './ChatList';

import styles from './Chat.module.scss';

export const Chat = () => {
    return (
        <div className={styles.container}>
            <ChatList />
        </div>
    );
};
