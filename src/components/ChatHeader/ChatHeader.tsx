import { useState } from 'react';

import { ChatMember } from '../../utils/models/Chat';
import { ChatInfoPopup } from '../ChatInfoPopup';

import styles from './ChatHeader.module.scss';

interface ChatHeaderProps {
    title: string;
    onlineStatus: boolean;
    type: 'private' | 'event' | 'group';
    participants?: ChatMember[];
}

export const ChatHeader = ({ title, onlineStatus, type, participants = [] }: ChatHeaderProps) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Функция для получения первой буквы названия
    const getInitial = (name: string) => {
        return name?.charAt(0).toUpperCase() || 'C'; // 'C' для Chat по умолчанию
    };

    // Для приватных чатов - аватар или инициал первого участника
    const privateChatAvatar = participants[0]?.profilePicture
        ? <img
            src={participants[0].profilePicture}
            alt="Аватар"
            className={styles.avatar}
            onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove(styles.hidden);
            }}
        />
        : <div className={styles.avatarPlaceholder}>
            {getInitial(participants[0]?.username || title)}
        </div>;

    // Для групп/ивентов - миниатюры участников или инициал названия
    const groupAvatars = () => {
        if (participants.length > 0) {
            const avatars = participants
                .filter(p => p?.profilePicture)
                .slice(0, 3)
                .map((p, index) => (
                    <div key={index} className={styles.avatarContainer}>
                        <img
                            src={p.profilePicture as string}
                            alt="Участник"
                            className={styles.avatar}
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                (e.target as HTMLImageElement).nextElementSibling?.classList.remove(styles.hidden);
                            }}
                        />
                        <div className={`${styles.avatarPlaceholder} ${styles.hidden}`}>
                            {getInitial(p.username)}
                        </div>
                    </div>
                ));

            return avatars.length > 0
                ? avatars
                : <div className={styles.avatarPlaceholder}>{getInitial(title)}</div>;
        }
        return <div className={styles.avatarPlaceholder}>{getInitial(title)}</div>;
    };

    return (
        <>
            <div className={styles.header} onClick={() => setIsPopupOpen(true)} style={{ cursor: 'pointer' }}>
                <div className={styles.headerLeft}>
                    {type === 'private'
                        ? (
                            <div className={styles.privateInfo}>
                                <div className={styles.avatarContainer}>
                                    {privateChatAvatar}
                                    {/* Fallback инициал (скрытый по умолчанию) */}
                                    <div className={`${styles.avatarPlaceholder} ${styles.hidden}`}>
                                        {getInitial(participants[0]?.username || title)}
                                    </div>
                                </div>
                                <h2 className={styles.title}>{title}</h2>
                                {onlineStatus && <span className={styles.onlineStatus}>Online</span>}
                            </div>
                        )
                        : (
                            <div className={styles.groupInfo}>
                                <div className={styles.avatars}>
                                    {groupAvatars()}
                                </div>
                                <h2 className={styles.title}>{title}</h2>
                            </div>
                        )}
                </div>
            </div>

            {isPopupOpen && type !== 'private' && (
                <ChatInfoPopup
                    title={title}
                    participants={participants}
                    images={participants
                        .filter(p => p?.profilePicture)
                        .map(p => p.profilePicture as string)
                    }
                    onClose={() => setIsPopupOpen(false)}
                />
            )}
        </>
    );
};

export default ChatHeader;
