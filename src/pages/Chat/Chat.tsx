import { ChatHeader } from "../../components/ChatHeader"
import { MessageInput } from "../../components/MessageInput";
import { MessageList } from "../../components/MessageList";
import styles from "./Chat.module.scss";

export const Chat = () => {
    return(
        <div className={styles.container}>
            <ChatHeader />
            <MessageList />
            <MessageInput />
        </div>
    );
};