import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { doc, getDoc, onSnapshot } from 'firebase/firestore';

import { ChatItem } from '../../components/ChatItem';
import { Icon } from '../../components/Icon';
import { Input } from '../../components/Input';
import { SearchUser } from '../../components/SearchUser';
import { db } from '../../firebase';
import { useSelector } from '../../redux/store';
import { IChatItem } from '../../utils/models/Chat';

import styles from './ChatList.module.scss';

export const ChatList = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [activeChatId] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'private' | 'groups' | 'events'>('all');
    const [chats, setChats] = useState<IChatItem[]>([]);
    const [showSearchUser, setShowSearchUser] = useState(false);

    const handleSearchValue = (value: string) => {
        setSearchValue(value);
    };

    const handleMessenger = () => {
        navigate('/messenger');
    };

    const handleShowSearchUser = () => {
        setShowSearchUser(true);
    };

    const filteredChats = chats?.filter(chat => {
        const senderName = chat.sender || '';
        const matchesSearch = senderName.toLowerCase().includes(searchValue.toLowerCase());
        const matchesFilter =
            filter === 'all' ||
            (filter === 'private' && chat.type === 'private') ||
            (filter === 'groups' && chat.type === 'group') ||
            (filter === 'events' && chat.type === 'event');
        return matchesSearch && matchesFilter;
    });

    useEffect(() => {
        if (!user?.uid) return;

        const unSub = onSnapshot(doc(db, 'userchats', user.uid), async (docSnap) => {
            try {
                const items = docSnap.data()?.chats || [];

                const promises = items.map(async (item: IChatItem) => {
                    // Для приватных чатов получаем данные собеседника
                    if (item.type === 'private') {
                        // Получаем ID собеседника из chatId (формат "uid1_uid2")
                        const participants = item.chatId.split('_');
                        const partnerId = participants.find(id => id !== user.uid);

                        if (partnerId) {
                            const userDoc = await getDoc(doc(db, 'users', partnerId));
                            return {
                                ...item,
                                sender: userDoc.data()?.username || 'Unknown',
                                profilePicture: userDoc.data()?.profilePicture,
                            };
                        }
                    }
                    return item;
                });

                const chatData = await Promise.all(promises);
                setChats(chatData.sort((a, b) =>
                    (b.lastMessage?.timestamp?.toMillis() || 0) -
                    (a.lastMessage?.timestamp?.toMillis() || 0),
                ));
            } catch (error) {
                console.error('Error loading chats:', error);
            }
        });

        return () => unSub();
    }, [user?.uid]);

    return (
        <div className={styles.container}>
            {showSearchUser && (
                <SearchUser onClose={() => setShowSearchUser(false)}/>
            )}
            <div className={styles.chatArea}>
                <div className={styles.searchContainer}>
                    <Icon
                        icon= 'search'
                        size='md'
                        onClick={() => {}}
                    />
                    <Input
                        type="text"
                        placeholder="Поиск чатов..."
                        value={searchValue}
                        onChange={handleSearchValue}
                        theme="light"
                    />
                    <Icon
                        icon= 'plus'
                        size='md'
                        onClick={handleShowSearchUser}
                    />
                </div>

                <div className={styles.header}>
                    <h2>
                        {filter === 'all' && 'Все чаты'}
                        {filter === 'private' && 'Личные сообщения'}
                        {filter === 'groups' && 'Групповые чаты'}
                        {filter === 'events' && 'Мероприятия'}
                    </h2>
                    <Icon
                        icon="arrow-reverse"
                        className={styles.sortIcon}
                        onClick={() => { /* Логика сортировки */ }}
                    />
                </div>

                <div className={styles.chats}>
                    {filteredChats
                        ? (
                            filteredChats.map((chat) => (
                                <ChatItem
                                    key={chat.chatId}
                                    chatItem={chat}
                                    isActive={activeChatId === chat.chatId}
                                    onClick={handleMessenger}
                                />
                            ))
                        )
                        : (
                            <div className={styles.noChats}>
                                <p>Чатов пока нет</p>
                                {/* Можно добавить кнопку для создания первого чата */}
                            </div>
                        )}
                </div>
            </div>

            <div className={styles.sidebar}>
                <div className={styles.filterTitle}>Фильтры</div>
                <div className={styles.filterButtons}>
                    <button
                        className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        <Icon icon="plus" className={styles.filterIcon} />
                        <span>Все чаты</span>
                    </button>
                    <button
                        className={`${styles.filterButton} ${filter === 'private' ? styles.active : ''}`}
                        onClick={() => setFilter('private')}
                    >
                        <Icon icon="user" className={styles.filterIcon} />
                        <span>Личные</span>
                    </button>
                    <button
                        className={`${styles.filterButton} ${filter === 'groups' ? styles.active : ''}`}
                        onClick={() => setFilter('groups')}
                    >
                        <Icon icon="user" className={styles.filterIcon} />
                        <span>Группы</span>
                    </button>
                    <button
                        className={`${styles.filterButton} ${filter === 'events' ? styles.active : ''}`}
                        onClick={() => setFilter('events')}
                    >
                        <Icon icon="food" className={styles.filterIcon} />
                        <span>Мероприятия</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
