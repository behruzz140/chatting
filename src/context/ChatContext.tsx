import React, { createContext, useContext, useState, useCallback } from 'react';
import { Chat, Message } from '../types';
import { mockChats } from '../data/mockData';

interface ChatContextType {
  chats: Chat[];
  activeChat: Chat | null;
  setActiveChat: (chat: Chat) => void;
  sendMessage: (chatId: number, text: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  const sendMessage = useCallback((chatId: number, text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      senderId: 0, // current user
      text,
      timestamp: new Date().toISOString(),
    };

    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );

    // Simulate response after 1-3 seconds
    const delay = 1000 + Math.random() * 2000;
    setTimeout(() => {
      const responses = [
        "Thanks for your message!",
        "I'll get back to you soon.",
        "Got it! 👍",
        "Thanks for letting me know.",
        "Interesting! Tell me more.",
      ];
      
      const responseMessage: Message = {
        id: Date.now(),
        senderId: chatId,
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toISOString(),
      };

      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === chatId
            ? { ...chat, messages: [...chat.messages, responseMessage] }
            : chat
        )
      );
    }, delay);
  }, []);

  return (
    <ChatContext.Provider value={{ chats, activeChat, setActiveChat, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}