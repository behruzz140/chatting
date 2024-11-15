import React from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import { ChatProvider } from './context/ChatContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="flex w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          <Sidebar />
          <ChatArea />
        </div>
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;