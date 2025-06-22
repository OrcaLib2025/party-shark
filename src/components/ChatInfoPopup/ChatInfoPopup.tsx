import { useEffect, useRef, useState } from 'react';

import { ChatMember } from '../../utils/models/Chat';
import { Icon } from '../Icon';

import styles from './ChatInfoPopup.module.scss';

interface IChatInfoPopup {
  title: string;
  participants: ChatMember[];
  images: string[];
  onClose: () => void;
}

type ViewMode = 'menu' | 'participants' | 'images';

export const ChatInfoPopup = ({
    title,
    participants,
    images,
    onClose,
}: IChatInfoPopup) => {
    const [viewMode, setViewMode] = useState<ViewMode>('menu');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    const getInitial = (username: string) => {
        return username?.charAt(0).toUpperCase() || 'U';
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div className={styles.overlay}>
            <div className={styles.popup} ref={popupRef}>
                <button className={styles.closeButton} onClick={onClose}>
                    <Icon icon="close" />
                </button>

                {viewMode === 'menu'
                    ? (
                        <>
                            <h2 className={styles.title}>{title}</h2>
                            <div className={styles.menu}>
                                <button
                                    className={styles.menuButton}
                                    onClick={() => setViewMode('participants')}
                                >
                                    <Icon icon="user" />
                                    <span>Участники ({participants.length})</span>
                                    <Icon icon="arrow-chevron-right" className={styles.arrow} />
                                </button>
                                <button
                                    className={styles.menuButton}
                                    onClick={() => setViewMode('images')}
                                >
                                    <Icon icon="image" />
                                    <span>Изображения ({images.length})</span>
                                    <Icon icon="arrow-chevron-right" className={styles.arrow} />
                                </button>
                            </div>
                        </>
                    )
                    : viewMode === 'participants'
                        ? (
                            <>
                                <div className={styles.header}>
                                    <button
                                        className={styles.backButton}
                                        onClick={() => setViewMode('menu')}
                                    >
                                        <Icon icon="arrow-chevron-left" />
                                    </button>
                                    <h2 className={styles.title}>Участники</h2>
                                </div>
                                <div className={styles.participantsList}>
                                    {participants.map((user) => (
                                        <div key={user.uid} className={styles.participant}>
                                            <div className={styles.avatarContainer}>
                                                {user.profilePicture
                                                    ? (
                                                        <img
                                                            src={user.profilePicture}
                                                            alt={user.username}
                                                            className={styles.avatar}
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).style.display = 'none';
                                                                // Показываем инициал при ошибке загрузки
                                                                (e.target as HTMLImageElement)
                                                                    .nextElementSibling?.classList
                                                                    .remove(styles.hidden);
                                                            }}
                                                        />
                                                    )
                                                    : (
                                                        <div className={styles.avatarPlaceholder}>
                                                            {getInitial(user.username)}
                                                        </div>
                                                    )}
                                                {/* Fallback инициал (скрытый по умолчанию) */}
                                                <div className={`${styles.avatarPlaceholder} ${styles.hidden}`}>
                                                    {getInitial(user.username)}
                                                </div>
                                            </div>
                                            <span className={styles.username}>{user.username}</span>
                                            {user.isOnline && <div className={styles.onlineDot} />}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )
                        : (
                            <>
                                <div className={styles.header}>
                                    <button
                                        className={styles.backButton}
                                        onClick={() => setViewMode('menu')}
                                    >
                                        <Icon icon="arrow-chevron-left" />
                                    </button>
                                    <h2 className={styles.title}>Изображения</h2>
                                </div>
                                <div className={styles.imageGrid}>
                                    {images.map((img, index) => (
                                        <div
                                            key={index}
                                            className={styles.imageItem}
                                            onClick={() => setSelectedImage(img)}
                                        >
                                            <img
                                                src={img}
                                                alt={`Изображение ${index + 1}`}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                {selectedImage && (
                    <div className={styles.imagePreview}>
                        <button
                            className={styles.closePreview}
                            onClick={() => setSelectedImage(null)}
                        >
                            <Icon icon="close" />
                        </button>
                        <img src={selectedImage} alt="Просмотр" />
                    </div>
                )}
            </div>
        </div>
    );
};
