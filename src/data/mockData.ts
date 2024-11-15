import { Chat } from '../types';

export const mockChats: Chat[] = [
  {
    id: 1,
    user: {
      id: 1,
      name: "Alice Cooper",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      status: "online"
    },
    messages: [
      {
        id: 1,
        senderId: 1,
        text: "Hey! How are you doing?",
        timestamp: "2024-03-10T12:30:00Z"
      },
      {
        id: 2,
        senderId: 0,
        text: "I'm doing great! Just working on some new projects. How about you?",
        timestamp: "2024-03-10T12:32:00Z"
      },
      {
        id: 3,
        senderId: 1,
        text: "Check out this amazing view!",
        timestamp: "2024-03-10T12:35:00Z",
        image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500"
      }
    ],
    unreadCount: 2
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "React Developers",
      avatar: "https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=100",
      status: "offline",
      lastSeen: "2 hours ago"
    },
    messages: [
      {
        id: 4,
        senderId: 2,
        text: "New features released! 🚀",
        timestamp: "2024-03-10T11:45:00Z"
      }
    ],
    unreadCount: 5
  },
  {
    id: 3,
    user: {
      id: 3,
      name: "Travel Group",
      avatar: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=100",
      status: "online"
    },
    messages: [
      {
        id: 5,
        senderId: 3,
        text: "Check out these photos from Paris!",
        timestamp: "2024-03-10T10:15:00Z"
      }
    ],
    unreadCount: 0
  }
];