import { mockChat } from '../../mock/chat';
import { ChatHeader } from '../../components/ChatHeader';
import { MessageInput } from '../../components/MessageInput';
import { MessageList } from '../../components/MessageList';
import styles from './Chat.module.scss';

export const Messenger = () => {
    return (
        <div className={styles.container}>
            <ChatHeader
                title={mockChat.title}
                onlineStatus={mockChat.onlineStatus}
                isGroupChat={mockChat.isGroupChat}
                participants={mockChat.participants}
            />
            <MessageList />
            <MessageInput />
        </div>
    );
};
