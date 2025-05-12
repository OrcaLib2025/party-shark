import { useState } from 'react';
import { Icon } from '../../components/Icon';
import { Input } from '../../components/Input';
import styles from './ChatList.module.scss';
import { ChatItem } from '../../components/ChatItem';

const mockChats = [
    {
        chatId: 1,
        uid: 1,
        lastMessage: 'Привет',
        sender: "Jane doe"
    },
        {
        chatId: 1,
        uid: 1,
        lastMessage: 'Привет',
        sender: "Jane doe"
    },
        {
        chatId: 1,
        uid: 1,
        lastMessage: 'Привет',
        sender: "Jane doe"
    },
        {
        chatId: 1,
        uid: 1,
        lastMessage: 'Привет',
        sender: "Jane doe"
    }
]

export const ChatList = () => {
    const [searchValue, setSearchValue] = useState('')
    const [addMode, setAddMode] = useState<'plus' | 'minus'>('plus')
    const handleChangeSearchBar = (value: string) => {
        setSearchValue(value);
    }
    const handleClickPlus = () => {
        setAddMode(addMode === 'plus' ? 'minus' : 'plus');
    }

    return (
        <div className={styles.chatList}>
            <div className={styles.search}>
                <div className={styles.searchBar}>
                    <Icon
                        icon="search"
                        className={styles.icon}
                    />
                    <Input
                        type='text'
                        placeholder='Поиск чатов'
                        theme="light"
                        onChange={handleChangeSearchBar}
                        value={searchValue}
                        size='large'
                        className={styles.input}
                    />
                </div>
                <Icon
                    icon={addMode}
                    className={styles.addIcon}
                    onClick={handleClickPlus}
                />
            </div>
            <div className={styles.chatList}>
                {mockChats.map((chatItem) => (
                    <ChatItem key={chatItem.chatId} chatItem={chatItem} />
                ))}
            </div>
        </div>
    )
}
