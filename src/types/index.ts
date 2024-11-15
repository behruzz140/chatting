export interface User {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen?: string;
}

export interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
  image?: string;
}

export interface Chat {
  id: number;
  user: User;
  messages: Message[];
  unreadCount: number;
}