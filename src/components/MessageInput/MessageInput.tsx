import { useState, useRef, useEffect } from "react";
import { Input } from "../Input";
import styles from "./MessageInput.module.scss";
import { Button } from "../Button";
import { Icon } from "../Icon";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

export const MessageInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const handleChangeInput = (value: string) => {
    setInputValue(value);
  };
  
  const handleSubmit = () => {
  };
  
  const handleEmoji = (e: EmojiClickData) => {
    setInputValue(inputValue => inputValue + e.emoji);
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.inputContainer}>
      <div className={styles.icons}>
        <Icon
          size="lg"
          icon="attachment"
          className={styles.icon}
          onClick={() => { }}
        />
      </div>
      <Input
        type="text"
        className={styles.inputField}
        placeholder="Напишите сообщение..."
        aria-label="Поле ввода сообщения"
        onChange={handleChangeInput}
        theme="light"
        size="large"
        value={inputValue}
      />
      <div className={styles.emoji} ref={emojiPickerRef}>
        <Icon
          icon="user-follow"
          size="lg"
          className={styles.icon}
          onClick={() => setIsEmojiOpen(!isEmojiOpen)}
        />
        <EmojiPicker
          className={styles.emojiPicker}
          open={isEmojiOpen}
          onEmojiClick={handleEmoji}
        />
      </div>
      <Button
        type="secondary"
        onClick={handleSubmit}
        theme="light"
        text="Отправить 📫"
        className={styles.sendButton}
      />
    </div>
  );
};