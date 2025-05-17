import { ChatHeader } from "../../components/ChatHeader"
import { MessageInput } from "../../components/MessageInput";
import { MessageList } from "../../components/MessageList";
import styles from "./Chat.module.scss";
import { ChatMember } from "../../utils/models/Chat";
import avatar from '../../assets/pictures/avatar.png'


interface MockChat {
  title: string;
  onlineStatus: boolean;
  isGroupChat: boolean;
  participants: {
    ChatMember: ChatMember;
  }[];
}

const mockChat: MockChat = {
  title: 'Морской клуб "Алые Паруса"',
  onlineStatus: true,
  isGroupChat: true,
  participants: [
    {
      ChatMember: {
        uid: 1,
        username: "Алексей Навальный",
        profilePicture: avatar,
        isOnline: true
      }
    },
    {
      ChatMember: {
        uid: 2,
        username: "Марина Цветаева",
        profilePicture: avatar,
        isOnline: false
      }
    },
    {
      ChatMember: {
        uid: 3,
        username: "Сергей Есенин",
        profilePicture: avatar,
        isOnline: true
      }
    },
    {
      ChatMember: {
        uid: 4,
        username: "Анна Ахматова",
        profilePicture: avatar,
        isOnline: false
      }
    },
    {
      ChatMember: {
        uid: 5,
        username: "Владимир Маяковский",
        profilePicture: avatar,
        isOnline: true
      }
    }
  ]
};
export const Messenger = () => {
    return(
        <div className={styles.container}>
            <ChatHeader 
                title = {mockChat.title}
                onlineStatus = {mockChat.onlineStatus}
                isGroupChat = {mockChat.isGroupChat}
                participants={mockChat.participants}
            />
            <MessageList />
            <MessageInput />
        </div>
    );
};