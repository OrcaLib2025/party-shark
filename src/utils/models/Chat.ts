import { Timestamp } from 'firebase/firestore';

export interface LastMessage {
  text: string;
  senderId: string;
  timestamp: Timestamp;
}
export interface UserChatData {
  chats: Array<{
    chatId: string;
    unreadCount: number;
    lastReadTimestamp?: Timestamp | null;
  }>;
}

export interface IChatItem {
    chatId: string;
    sender: string;
    lastMessage?: LastMessage;
    isOnline?: boolean;
    unreadCount?: number;
    profilePicture?: string;
    type: 'private' | 'group' | 'event' | 'all';
}

export interface ChatMember {
    username: string;
    isOnline: boolean;
    uid: number;
    profilePicture?: string;
}

export interface Chat {
    title: string;
    onlineStatus: boolean;
    isGroupChat: boolean;
    participants: {
        ChatMember: ChatMember;
    }[];
}
