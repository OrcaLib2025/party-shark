import { useEffect, useRef, useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';

import { db } from '../../firebase';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Input } from '../Input';

import styles from './MessageInput.module.scss';

interface MessageInputProps {
  chatId?: string;
  currentUserId: string;
}

export const MessageInput = ({ chatId, currentUserId }: MessageInputProps) => {
    const [inputValue, setInputValue] = useState('');
    const [isEmojiOpen, setIsEmojiOpen] = useState(false);
    const emojiPickerRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || !chatId) return;

        try {
            // Добавляем сообщение в подколлекцию messages
            await addDoc(collection(db, 'chats', chatId, 'messages'), {
                text: inputValue,
                senderId: currentUserId,
                timestamp: serverTimestamp(),
                image: null, // Можно добавить загрузку изображений
            });

            // Обновляем lastMessage в основном документе чата
            await updateDoc(doc(db, 'chats', chatId), {
                lastMessage: {
                    text: inputValue,
                    senderId: currentUserId,
                    timestamp: serverTimestamp(),
                },
            });

            setInputValue('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleEmoji = (e: EmojiClickData) => {
        setInputValue(prev => prev + e.emoji);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emojiPickerRef.current &&
                !emojiPickerRef.current.contains(event.target as Node) &&
                !(event.target as Element).closest(`.${styles.icons}`)) {
                setIsEmojiOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.inputContainer}>
            <div className={styles.icons}>
                <Icon
                    size="lg"
                    icon="attachment"
                    className={styles.icon}
                    onClick={() => { /* Реализация загрузки файлов */ }}
                />
            </div>

            <Input
                type="text"
                classNames={styles.inputField}
                placeholder="Напишите сообщение..."
                aria-label="Поле ввода сообщения"
                onChange={(value) => setInputValue(value)}
                theme="light"
                size="large"
                value={inputValue}
            />

            <div className={styles.emojiContainer} ref={emojiPickerRef}>
                <Icon
                    icon="user-follow"
                    size="lg"
                    className={styles.icon}
                    onClick={() => setIsEmojiOpen(!isEmojiOpen)}
                />
                {isEmojiOpen && (
                    <div className={styles.emoji}>
                        <EmojiPicker
                            className={styles.emojiPicker}
                            onEmojiClick={handleEmoji}
                        />
                    </div>
                )}
            </div>

            <Button
                type="secondary"
                onClick={handleSendMessage}
                theme="light"
                text="Отправить 📫"
                className={styles.sendButton}
                disabled={!inputValue.trim()}
            />
        </div>
    );
};
