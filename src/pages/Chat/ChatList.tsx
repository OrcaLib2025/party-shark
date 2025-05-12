import { useState } from 'react';
import { Icon } from '../../components/Icon';
import { Input } from '../../components/Input';
import styles from './ChatList.module.scss';

export const ChatList = () => {
    const [searchValue, setSearchValue] = useState('')
    const handleChangeSearchBar = (value: string) => {
        setSearchValue(value);
    }
    const handleClickPlus = () => {
    }

    return (
        <div className = {styles.chatList}>
            <div className={styles.search}>
                <div className={styles.searchBar}>
                    <Icon
                        icon="search"
                        className={styles.icon}
                        color='#000000'
                        />
                    <Input
                        type='text'
                        placeholder='Поиск чатов'
                        theme= "light"
                        onChange= {handleChangeSearchBar}
                        value={searchValue}
                    />
                    <Icon 
                        icon= 'plus'
                        className={styles.icon}
                        onClick = {handleClickPlus}
                    />
                </div>
            </div>
        </div>
    )
}
