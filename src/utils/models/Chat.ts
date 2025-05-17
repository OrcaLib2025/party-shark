import { Timestamp } from "firebase/firestore";

export interface IChatItem {
    chatId: number;
    uid?: number;
    sender: string;
    lastMessage?: string;
    messageTime?: Timestamp;
    isOnline?: boolean;
    unreadCount?: number;
    isGroup?: boolean;
    profilePicture?: string;
    type: "private" | "group" | "event" | "all";
}

export interface ChatMember {
    username: string;
    isOnline: boolean;
    uid: number;
    profilePicture?: string;
}
