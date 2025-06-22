import { useEffect, useRef, useState } from 'react';

import { collection, DocumentSnapshot, onSnapshot, orderBy, query } from 'firebase/firestore';

import { db } from '../../firebase';
import { useSelector } from '../../redux/store';
import { MessageType } from '../../utils/models/Chat';
import { Message } from '../Message';

import styles from './MessageList.module.scss';

interface MessageListProps {
    chatId: string;
}

export const MessageList = ({ chatId }: MessageListProps) => {
    const { user } = useSelector((state) => state.auth);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<MessageType[]>([]);

    useEffect(() => {
        if (!chatId) return;

        const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('timestamp', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newMessages: MessageType[] = [];
            snapshot.forEach((doc: DocumentSnapshot) => {
                // Проверяем, существует ли документ и содержит ли он данные
                if (!doc.exists()) return;

                const data = doc.data();

                // Проверяем наличие нужных полей
                if ('text' in data && 'senderId' in data && 'timestamp' in data) {
                    newMessages.push({
                        id: doc.id,
                        text: data.text as string,
                        senderId: data.senderId as string,
                        timestamp: data.timestamp,
                        image: data.image ? (data.image as string) : undefined,
                        metadata: {
                            hasPendingWrites: doc.metadata.hasPendingWrites,
                            fromCache: doc.metadata.fromCache,
                        },
                    });
                }
            });

            setMessages(newMessages);
        });

        return () => unsubscribe();
    }, [chatId]);

    useEffect(() => {
        const container = chatContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);
    return (
        <div className={styles.list} ref={chatContainerRef}>
            {messages.map((message) => (
                <Message
                    key={message.id}
                    message={{
                        ...message,
                        isCurrentUser: message.senderId === user.uid,
                        sender: user.username, // Должно приходить из данных участника чата
                        timestamp: message.timestamp
                            ? message.timestamp.toDate().toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })
                            : '…',
                    }}
                />
            ))}
        </div>
    );
};
