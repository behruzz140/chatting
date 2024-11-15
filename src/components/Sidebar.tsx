import React from 'react';
import { Search, Menu, MessageSquare, Users2, BookMarked, Settings, Moon, Sun } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { useTheme } from '../context/ThemeContext';
import { formatMessageTime } from '../utils/dateFormat';

export default function Sidebar() {
  const { chats, setActiveChat, activeChat } = useChat();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="w-80 h-screen flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="p-4 flex items-center justify-between border-b dark:border-gray-700">
        <button className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg">
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
        <div className="flex-1 px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-200 dark:placeholder-gray-400"
            />
            <Search className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
              activeChat?.id === chat.id ? 'bg-blue-50 dark:bg-gray-700' : ''
            }`}
            onClick={() => setActiveChat(chat)}
          >
            <img
              src={chat.user.avatar}
              alt={chat.user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{chat.user.name}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatMessageTime(chat.messages[chat.messages.length - 1].timestamp)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {chat.messages[chat.messages.length - 1].text}
                </p>
                {chat.unreadCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t dark:border-gray-700 p-4">
        <div className="flex justify-around">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <MessageSquare className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Users2 className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <BookMarked className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Settings className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            {isDark ? (
              <Sun className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}