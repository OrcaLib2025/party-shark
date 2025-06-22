import { useEffect, useState } from 'react';

import { doc, getDoc } from 'firebase/firestore';

import { db } from '../firebase';
import { ChatMember } from './models/Chat';

export const useGetUserById = (userId: string): ChatMember | null => {
    const [user, setUser] = useState<ChatMember | null>(null);

    useEffect(() => {
        if (!userId || userId.trim() === '') {
            setUser(null); // ❗ Если ID пустой — не делаем запрос
            return;
        }

        const fetchUser = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', userId));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUser({
                        username: userData.username || '',
                        isOnline: userData.isOnline || false,
                        uid: userId,
                        profilePicture: userData.profilePicture || '',
                        email: userData.email || '',
                    });
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null);
            }
        };

        fetchUser();
    }, [userId]);

    return user;
};

export default useGetUserById;
