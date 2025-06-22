import { useEffect, useRef, useState } from 'react';

import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';

import { db } from '../../firebase';
import { useSelector } from '../../redux/store';
import { User } from '../../utils/models/AuthData';
import { UserChatData } from '../../utils/models/Chat';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Input } from '../Input';

import styles from './SearchUser.module.scss';

export const SearchUser = ({ onClose }: { onClose: () => void }) => {
    const [searchValue, setSearchValue] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const usersCollection = collection(db, 'users');
                const usersSnapshot = await getDocs(usersCollection);
                const usersList = usersSnapshot.docs.map(doc => ({
                    uid: doc.id,
                    ...doc.data(),
                })) as User[];
                setUsers(usersList);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const generatePrivateChatId = (uid1: string, uid2: string): string => {
        return [uid1, uid2].sort().join('_');
    };

    const handleAdd = async (selectedUserId: string) => {
        if (!user?.uid) return;

        try {
        // Генерируем ID чата
            const chatId = generatePrivateChatId(user.uid, selectedUserId);

            // Проверяем/создаём чат
            const chatRef = doc(db, 'chats', chatId);
            const chatSnap = await getDoc(chatRef);

            if (!chatSnap.exists()) {
                await setDoc(chatRef, {
                    type: 'private',
                    participants: {
                        [user.uid]: true,
                        [selectedUserId]: true,
                    },
                    createdAt: serverTimestamp(),
                });
                await setDoc(doc(chatRef, 'messages', 'initial'), { placeholder: true });
            }

            // Обновляем userchats для обоих пользователей
            const updateUserChats = async (userId: string) => {
                const userChatsRef = doc(db, 'userchats', userId); // англ. "c"!
                const docSnap = await getDoc(userChatsRef);

                const currentData = docSnap.exists()
                    ? (docSnap.data() as UserChatData)
                    : { chats: [] };

                if (!currentData.chats.some(chat => chat.chatId === chatId)) {
                    await setDoc(userChatsRef, {
                        chats: [...currentData.chats, {
                            chatId,
                            unreadCount: 0,
                            lastReadTimestamp: null,
                        }],
                    }, { merge: true });
                }
            };

            await Promise.all([
                updateUserChats(user.uid),
                updateUserChats(selectedUserId),
            ]);

            onClose();
        } catch (error) {
            console.error('Error creating chat:', error);
        }
    };

    const filteredUsers = users.filter(allUsers =>
        allUsers.uid !== user.uid &&
        allUsers.username?.toLowerCase().includes(searchValue.toLowerCase()),
    );

    return (
        <div className={styles.searchContainer}>
            <div className={styles.popup} ref={popupRef}>
                <div className={styles.searchHeader}>
                    <Icon
                        icon='close'
                        onClick={onClose}
                        className={styles.closeButton}
                    />
                    <h3>Поиск пользователей</h3>
                </div>

                <Input
                    type="text"
                    placeholder="Введите имя пользователя..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    theme='light'
                />

                {loading
                    ? (
                        <div className={styles.loading}>Загрузка...</div>
                    )
                    : (
                        <ul className={styles.usersList}>
                            {filteredUsers.length > 0
                                ? (
                                    filteredUsers.map(user => (
                                        <li key={user.uid} className={styles.userItem}>
                                            <div className={styles.userInfoContainer}>
                                                <div className={styles.userAvatar}>
                                                    {user.profilePicture
                                                        ? (
                                                            <img src={user.profilePicture} alt={user.username} />
                                                        )
                                                        : (
                                                            <div className={styles.defaultAvatar} />
                                                        )}
                                                </div>
                                                <div className={styles.userInfo}>
                                                    <span className={styles.username}>{user.username}</span>
                                                    {user.email && <span className={styles.email}>{user.email}</span>}
                                                </div>
                                            </div>
                                            <Button
                                                text="Написать"
                                                size='sm'
                                                className={styles.messageButton}
                                                onClick={() => handleAdd(user.uid)}
                                                icon={<Icon icon="user-follow" />}
                                                type="secondary"
                                                theme="light"
                                            />
                                        </li>
                                    ))
                                )
                                : (
                                    <div className={styles.noResults}>
                                        {searchValue ? 'Пользователи не найдены' : 'Начните вводить имя для поиска'}
                                    </div>
                                )}
                        </ul>
                    )}
            </div>
        </div>
    );
};
