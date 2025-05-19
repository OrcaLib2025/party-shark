import { mockMessages } from '../../mock/message';
import { Message } from '../Message';
import styles from './MessageList.module.scss';


export const MessageList = () => {
    return (
        <div className={styles.list}>
            {mockMessages.map((message) => (
                <Message key={message.id} message={message} />
            ))}
        </div>
    );
};
