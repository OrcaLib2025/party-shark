import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { doc, onSnapshot } from 'firebase/firestore';

import { ChatHeader } from '../../components/ChatHeader';
import { MessageInput } from '../../components/MessageInput';
import { MessageList } from '../../components/MessageList';
import { db } from '../../firebase';
import { useSelector } from '../../redux/store';
import { Chat } from '../../utils/models/Chat';

import styles from './Chat.module.scss';

export const Messenger = () => {
    const { user } = useSelector((state) => state.auth);
    const { chatId } = useParams<{ chatId: string }>();
    const [chat, setChat] = useState<Chat | null>(null);

    useEffect(() => {
        if (!chatId) return;

        const unsubscribe = onSnapshot(doc(db, 'chats', chatId), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setChat({
                    id: docSnap.id,
                    ...data,
                } as Chat);
            } else {
                console.log('Чат не найден');
            }
        });

        return () => unsubscribe();
    }, [chatId]);

    if (!chat) {
        return <div>Загрузка чата...</div>;
    }

    return (
        <div className={styles.container}>
            <ChatHeader
                title={chat.type === 'private' ? 'Denis' : ''}
                onlineStatus={false} // Можно получить из участников
                type={chat.type}
                participants={Object.keys(chat.participants).map(uid => ({
                    ChatMember: {
                        username: '', // Подгружать из коллекции users
                        isOnline: false,
                        uid,
                        profilePicture: '',
                    },
                }))}
            />
            <MessageList chatId={chatId!} />
            <MessageInput chatId={chatId!} currentUserId={user.uid} />
        </div>
    );
};
