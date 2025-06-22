import { Timestamp } from 'firebase/firestore';

// Для последнего сообщения в чате
export interface LastMessage {
  text: string;
  senderId: string; // ID отправителя (string)
  timestamp: Timestamp;
}

// Данные о чатах пользователя в userchats коллекции
export interface UserChatData {
  chats: Array<{
    chatId: string;
    unreadCount: number;
    lastReadTimestamp?: Timestamp | null;
  }>;
}

// Участник чата (должен соответствовать данным из users коллекции)
export interface ChatMember {
    username: string;
    isOnline?: boolean;
    uid: string; // Изменено с number на string (Firebase использует строковые ID)
    profilePicture?: string;
}

// Основная информация о чате (документ в chats коллекции)
export interface Chat {
    id: string; // chatId из вашей структуры
    title?: string; // Для групповых чатов
    createdAt: Timestamp;
    isGroupChat: boolean;
    type: 'private' | 'group' | 'event'; // 'all' убрано - это только для фильтрации
    lastMessage?: LastMessage;
    participants: Record<string, boolean>; // { userId: true } - как в вашей Firebase структуре
}

// Элемент списка чатов (для ChatList)
export interface IChatItem {
    chatId: string;
    title: string;
    type: 'private' | 'group' | 'event';
    lastMessage?: LastMessage;
    unreadCount: number;
    // Для приватных чатов:
    sender?: string; // Имя собеседника
    profilePicture?: string; // Аватар собеседника
    isOnline?: boolean; // Статус собеседника
    // Для групповых чатов:
    participantsCount?: number;
}

export interface MessageType {
    id: string;
    text: string;
    senderId: string;
    timestamp: Timestamp;
    image?: string;
    metadata?: {
        hasPendingWrites: boolean;
        fromCache: boolean;
    };
}
