import { Timestamp } from 'firebase/firestore';
export type Message = {
    id: string;
    senderId: string;
    text: string;
    timestamp?: Timestamp;
    image?: string;
    metadata?: {
        hasPendingWrites: boolean;
        fromCache: boolean;
    };
    read?: boolean;
}

export type Chat = {
    id: string;
    participants: string[];
    lastMessage: Message;
    chatName?: string;
}
