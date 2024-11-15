import React, { useState, useRef, useEffect } from 'react';
import { Phone, Video, MoreVertical, Smile, Paperclip, Send, Image, Mic } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { formatMessageTime } from '../utils/dateFormat';

export default function ChatArea() {
  const { activeChat, sendMessage } = useChat();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && activeChat) {
      sendMessage(activeChat.id, message.trim());
      setMessage('');
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-600 dark:text-gray-300">Select a chat to start messaging</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Choose from your existing conversations</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800">
        <div className="flex items-center">
          <img
            src={activeChat.user.avatar}
            alt={activeChat.user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h2 className="font-medium text-gray-900 dark:text-gray-100">{activeChat.user.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isTyping ? 'typing...' : activeChat.user.status === 'online' ? 'online' : `last seen ${activeChat.user.lastSeen}`}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Phone className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Video className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
        <div className="space-y-4">
          {activeChat.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === 0 ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg p-3 max-w-md shadow-sm ${
                  msg.senderId === 0
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                }`}
              >
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Shared content"
                    className="rounded-lg max-w-full h-auto mb-2"
                  />
                )}
                <p>{msg.text}</p>
                <span
                  className={`text-xs mt-1 ${
                    msg.senderId === 0 ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {formatMessageTime(msg.timestamp)}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        <form onSubmit={handleSend} className="flex items-center space-x-2">
          <button type="button" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Smile className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <button type="button" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Paperclip className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 border dark:border-gray-600 rounded-full py-2 px-4 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          />
          {message ? (
            <button
              type="submit"
              className="p-2 hover:bg-blue-600 bg-blue-500 rounded-full"
            >
              <Send className="w-6 h-6 text-white" />
            </button>
          ) : (
            <>
              <button type="button" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <Image className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
              <button type="button" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <Mic className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}