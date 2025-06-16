import React, { useState } from 'react';
import { Search, Plus, Settings, Moon, Archive, Users } from 'lucide-react';
import { Chat } from '../types';
import { ChatListItem } from './ChatListItem';

interface SidebarProps {
  chats: Chat[];
  currentChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSettingsClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  chats,
  currentChat,
  onChatSelect,
  searchQuery,
  onSearchChange,
  onSettingsClick
}) => {
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts'>('chats');

  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.messages.some(msg => 
      msg.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const pinnedChats = filteredChats.filter(chat => chat.isPinned);
  const regularChats = filteredChats.filter(chat => !chat.isPinned);

  return (
    <div className="w-80 bg-black/20 backdrop-blur-xl border-r border-white/10 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Crypton
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={onSettingsClick}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Settings size={20} className="text-gray-300" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Plus size={20} className="text-gray-300" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mt-4 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('chats')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'chats'
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Chats
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'contacts'
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Contacts
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'chats' && (
          <>
            {pinnedChats.length > 0 && (
              <div>
                <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Pinned
                </div>
                {pinnedChats.map(chat => (
                  <ChatListItem
                    key={chat.id}
                    chat={chat}
                    isActive={currentChat?.id === chat.id}
                    onClick={() => onChatSelect(chat)}
                  />
                ))}
              </div>
            )}
            
            {regularChats.length > 0 && (
              <div>
                {pinnedChats.length > 0 && (
                  <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    All Chats
                  </div>
                )}
                {regularChats.map(chat => (
                  <ChatListItem
                    key={chat.id}
                    chat={chat}
                    isActive={currentChat?.id === chat.id}
                    onClick={() => onChatSelect(chat)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'contacts' && (
          <div className="p-4">
            <div className="flex items-center justify-center text-gray-400 py-8">
              <Users size={48} className="mb-2" />
            </div>
            <p className="text-center text-gray-400">
              Contact management coming soon
            </p>
          </div>
        )}

        {filteredChats.length === 0 && searchQuery && (
          <div className="p-4 text-center text-gray-400">
            <Search size={48} className="mx-auto mb-2 opacity-50" />
            <p>No chats found</p>
          </div>
        )}
      </div>
    </div>
  );
};