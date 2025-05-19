import { useState } from 'react';

import styles from './Message.module.scss';

interface IMessage {
    message: {
        id: number;
        text: string;
        sender: string;
        timestamp: string;
        isCurrentUser: boolean;
        image?: string | undefined;
    };
}

export const Message: React.FC<IMessage> = ({ message }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <>
            <div className={`${styles.message} ${message.isCurrentUser ? styles['message--current-user'] : styles['message--not-current-user']}`}>
                {!message.isCurrentUser && (
                    <div className={styles['message__sender']}>{message.sender}</div>
                )}
                <div className={`${styles['message__content']} ${message.isCurrentUser ? styles['message__content--current-user'] : styles['message__content--not-current-user']}`}>
                    {message.image && (
                        <img
                            className={styles['message__image']}
                            src={message.image}
                            alt="Сообщение"
                            onClick={() => setSelectedImage(message.image || null)}
                        />
                    )}
                    <div className={styles['message__text']}>{message.text}</div>
                    <div className={styles['message__time']}>{message.timestamp}</div>
                </div>
            </div>

            {selectedImage && (
                <div className={styles['message__preview']}>
                    <button
                        className={styles['message__close-preview']}
                        onClick={() => setSelectedImage(null)}
                    >
                        <span>×</span>
                    </button>
                    <img src={selectedImage} alt="Просмотр изображения" />
                </div>
            )}
        </>
    );
};
