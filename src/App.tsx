import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { Settings } from './components/Settings';
import { useChat } from './hooks/useChat';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const {
    currentChat,
    chats,
    currentUser,
    searchQuery,
    setCurrentChat,
    sendMessage,
    setSearchQuery,
    markAsRead
  } = useChat();

  const handleChatSelect = (chat: any) => {
    setCurrentChat(chat);
    markAsRead(chat.id);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex h-full">
        <Sidebar
          chats={chats}
          currentChat={currentChat}
          onChatSelect={handleChatSelect}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSettingsClick={() => setShowSettings(true)}
        />
        
        {currentChat ? (
          <ChatArea
            chat={currentChat}
            currentUser={currentUser}
            onSendMessage={sendMessage}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">💬</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to Crypton</h2>
              <p className="text-gray-400 max-w-md">
                Select a chat from the sidebar to start messaging. Experience secure, 
                modern communication with beautiful design.
              </p>
            </div>
          </div>
        )}
      </div>

      <Settings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        currentUser={currentUser}
      />
    </div>
  );
}

export default App;