import { useEffect, useState } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';

import { db } from '../firebase';
import { Chat } from './models/Chat';

const useGetChat = (chatId: string | undefined): Chat | null => {
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
                setChat(null);
            }
        });

        return () => unsubscribe();
    }, [chatId]);

    return chat;
};

export default useGetChat;
