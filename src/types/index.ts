export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: Date;
  bio?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'voice' | 'file';
  isRead: boolean;
  reactions?: { emoji: string; count: number; users: string[] }[];
  replyTo?: Message;
  forwarded?: boolean;
  fileName?: string;
  fileSize?: string;
  duration?: number;
}

export interface Chat {
  id: string;
  type: 'private' | 'group' | 'channel';
  title: string;
  avatar: string;
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
}

export interface ChatState {
  currentChat: Chat | null;
  chats: Chat[];
  currentUser: User;
  isTyping: boolean;
  searchQuery: string;
}