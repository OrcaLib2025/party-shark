import { Timestamp } from "firebase/firestore";
export type Message = {
    id: string;
    senderId: string;
    text: string;
    timestamp?: Timestamp;
    read?: boolean;
}

export type Chat = {
    id: string;
    participants: string[];
    lastMessage: Message;
    chatName?: string;
}