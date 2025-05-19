import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import avatarImage from '../../assets/pictures/avatar.png';
import avatarGroupImage from '../../assets/pictures/group-avatar.png';
import { ChatItem } from '../../components/ChatItem';
import { Icon } from '../../components/Icon';
import { Input } from '../../components/Input';
import { IChatItem } from '../../utils/models/Chat';
import styles from './ChatList.module.scss';

const mockChats: IChatItem[] = [
    {
        chatId: 1,
        sender: 'Команда PartyShark',
        lastMessage: 'Готовим новый функционал!',
        isGroup: true,
        unreadCount: 5,
        type: 'event',
        profilePicture: avatarGroupImage,
        messageTime: new Timestamp(1710000000, 0),
        isOnline: false,
    },
    {
        chatId: 2,
        sender: 'Алексей (Яхт-клуб)',
        lastMessage: 'Завтра выходим в море в 9:00',
        isGroup: false,
        unreadCount: 0,
        type: 'private',
        profilePicture: avatarImage,
        messageTime: new Timestamp(1709990000, 0),
        isOnline: true,
    },
    {
        chatId: 3,
        sender: "Морской клуб 'Волна'",
        lastMessage: 'Регистрация на регату открыта!',
        isGroup: true,
        unreadCount: 12,
        type: 'event',
        profilePicture: avatarGroupImage,
        messageTime: new Timestamp(1709900000, 0),
        isOnline: false,
    },
    {
        chatId: 4,
        sender: 'Марина',
        lastMessage: 'Привет! Как твои дела?',
        isGroup: false,
        unreadCount: 2,
        type: 'private',
        profilePicture: avatarImage,
        messageTime: new Timestamp(1709890000, 0),
        isOnline: true,
    },
    {
        chatId: 5,
        sender: 'Рыбацкий чат',
        lastMessage: 'Кто едет на рыбалку в субботу?',
        isGroup: true,
        unreadCount: 0,
        type: 'group',
        profilePicture: avatarGroupImage,
        messageTime: new Timestamp(1709800000, 0),
        isOnline: false,
    },
    {
        chatId: 6,
        sender: 'Иван Петров',
        lastMessage: 'Отправил тебе документы',
        isGroup: false,
        unreadCount: 1,
        type: 'private',
        profilePicture: avatarImage,
        messageTime: new Timestamp(1709750000, 0),
        isOnline: false,
    },
    {
        chatId: 7,
        sender: "Фестиваль 'Море Ярко'",
        lastMessage: 'Программа фестиваля обновлена',
        isGroup: true,
        unreadCount: 7,
        type: 'event',
        profilePicture: avatarGroupImage,
        messageTime: new Timestamp(1709700000, 0),
        isOnline: false,
    },
    {
        chatId: 8,
        sender: "Ольга (Бар 'Шторм')",
        lastMessage: 'Ждем вас на нашем новом мероприятии!',
        isGroup: false,
        unreadCount: 0,
        type: 'private',
        profilePicture: avatarImage,
        messageTime: new Timestamp(1709650000, 0),
        isOnline: true,
    },
    {
        chatId: 9,
        sender: 'Чат дайверов',
        lastMessage: 'Новые места для дайвинга в этом сезоне',
        isGroup: true,
        unreadCount: 3,
        type: 'group',
        profilePicture: avatarGroupImage,
        messageTime: new Timestamp(1709600000, 0),
        isOnline: false,
    },
    {
        chatId: 10,
        sender: 'Сергей (Инструктор)',
        lastMessage: 'Завтра в 10:00 тренировка',
        isGroup: false,
        unreadCount: 0,
        type: 'private',
        profilePicture: avatarImage,
        messageTime: new Timestamp(1709550000, 0),
        isOnline: false,
    },
];

export const ChatList = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [activeChatId] = useState<number | null>(null);
    const [filter, setFilter] = useState<'all' | 'private' | 'groups' | 'events'>('all');

    const handleSearchValue = (value: string) => {
        setSearchValue(value);
    };

    const handleMessenger = () => {
        navigate('/messenger');
    };

    const filteredChats = mockChats.filter(chat => {
        const matchesSearch = chat.sender.toLowerCase().includes(searchValue.toLowerCase());
        const matchesFilter =
            filter === 'all' ||
            (filter === 'private' && chat.type === 'private') ||
            (filter === 'groups' && chat.isGroup) ||
            (filter === 'events' && chat.type === 'event');
        return matchesSearch && matchesFilter;
    });

    return (
        <div className={styles.container}>
            <div className={styles.chatArea}>
                <div className={styles.searchContainer}>
                    <Input
                        type="text"
                        placeholder="Поиск чатов..."
                        value={searchValue}
                        onChange={handleSearchValue}
                        theme="light"
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
                    {filteredChats.map((chat) => (
                        <ChatItem
                            key={chat.chatId}
                            chatItem={chat}
                            isActive={activeChatId === chat.chatId}
                            onClick={handleMessenger}
                        />
                    ))}
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
