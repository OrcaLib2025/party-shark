import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { doc, onSnapshot } from 'firebase/firestore';

import { ChatHeader } from '../../components/ChatHeader';
import { MessageInput } from '../../components/MessageInput';
import { MessageList } from '../../components/MessageList';
import { db } from '../../firebase';
import { useSelector } from '../../redux/store';
import { Chat } from '../../utils/models/Chat';
import { useGetUserById } from '../../utils/useGetUserById';

import styles from './Chat.module.scss';

export const Messenger = () => {
    const { user } = useSelector((state) => state.auth);
    const { chatId } = useParams<{ chatId: string }>();
    const [chat, setChat] = useState<Chat | null>(null);

    // 1. Подписка на чат
    useEffect(() => {
        if (!chatId) return;

        const unsubscribe = onSnapshot(doc(db, 'chats', chatId), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setChat({
                    id: docSnap.id,
                    ...data,
                } as Chat);
            }
        });

        return () => unsubscribe();
    }, [chatId]);

    // 2. Получаем ID собеседника (вызываем ДО условного рендера)
    const participantIds = chat ? Object.keys(chat.participants).filter(uid => uid !== user.uid) : [];
    const partnerId = participantIds[0];
    const partner = useGetUserById(chat ? partnerId || '' : ''); // Хук вызывается всегда

    if (!chat) {
        return <div>Загрузка чата...</div>;
    }

    return (
        <div className={styles.container}>
            <ChatHeader
                title={partner?.username || 'Собеседник'}
                onlineStatus={partner?.isOnline || false}
                type={chat.type}
                participants={
                    chat.type === 'group'
                        ? Object.keys(chat.participants).map(uid => ({
                            username: '', // Можно подгрузить через useGetUserById в списке
                            isOnline: false,
                            uid,
                            profilePicture: '',
                        }))
                        : partner
                            ? [
                                {
                                    username: partner.username,
                                    isOnline: partner.isOnline,
                                    uid: partner.uid,
                                    profilePicture: partner.profilePicture,
                                },
                            ]
                            : []
                }
            />
            <MessageList chatId={chatId!} />
            <MessageInput chatId={chatId!} currentUserId={user.uid} />
        </div>
    );
};
