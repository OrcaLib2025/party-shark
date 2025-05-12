import { ChatHeader } from "../../components/ChatHeader"
import { MessageInput } from "../../components/MessageInput";
import { MessageList } from "../../components/MessageList";
import { ChatList } from "./ChatList";
import styles from "./Chat.module.scss";

export const Chat = () => {
    return(
        <div className={styles.container}>
            <ChatList />
            
            {/* <ChatHeader />
            <MessageList />
            <MessageInput /> */}
        </div>
    );
};