import { useState } from "react";
import styles from "./ChatHeader.module.scss";
import { ChatMember } from "../../utils/models/Chat";
import { ChatInfoPopup } from "../ChatInfoPopup";
import image from '../../assets/pictures/group-avatar.png'
import avatar from '../../assets/pictures/avatar.png'
interface ChatHeaderProps {
  title: string;
  onlineStatus: boolean;
  isGroupChat: boolean;
  participants: {
    ChatMember: ChatMember
  }[]
  chatImages?: string[];
}
export const ChatHeader = ({
  title,
  onlineStatus,
  isGroupChat,
  participants,
  chatImages = [image, avatar],
}: ChatHeaderProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const participantsCount = participants.length;

  const getParticipantsText = (count: number) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return `${count} участник`;
    }
    if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
      return `${count} участника`;
    }
    return `${count} участников`;
  };

  return (
    <>
      <div 
        className={styles.header}
        onClick={() => setIsPopupOpen(true)}
        style={{ cursor: 'pointer' }}
      >
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.info}>
          {onlineStatus && (
            <span className={styles.onlineStatus}>Online</span>
          )}
          {isGroupChat && (
            <span className={styles.participants}>
              {getParticipantsText(participantsCount)}
            </span>
          )}
        </div>
      </div>

      {isPopupOpen && (
        <ChatInfoPopup
          title={title}
          participants={participants}
          images={chatImages}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </>
  );
};

export default ChatHeader;