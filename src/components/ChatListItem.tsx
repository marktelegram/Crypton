import React from 'react';
import { Chat } from '../types';
import { Pin, Volume2, VolumeX } from 'lucide-react';

interface ChatListItemProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ chat, isActive, onClick }) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    
    return date.toLocaleDateString();
  };

  const getLastMessagePreview = () => {
    if (!chat.lastMessage) return 'No messages yet';
    
    switch (chat.lastMessage.type) {
      case 'image':
        return '📷 Photo';
      case 'voice':
        return '🎤 Voice message';
      case 'file':
        return '📎 File';
      default:
        return chat.lastMessage.content;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative p-4 cursor-pointer transition-all duration-200 hover:bg-white/5 ${
        isActive ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-r-2 border-purple-400' : ''
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={chat.avatar}
            alt={chat.title}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10"
          />
          {chat.type === 'private' && chat.participants.some(p => p.isOnline && p.id !== 'user-1') && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-white truncate">{chat.title}</h3>
              {chat.isPinned && <Pin size={14} className="text-purple-400" />}
              {chat.isMuted && <VolumeX size={14} className="text-gray-400" />}
            </div>
            {chat.lastMessage && (
              <span className="text-xs text-gray-400 flex-shrink-0">
                {formatTime(chat.lastMessage.timestamp)}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-gray-300 truncate">
              {getLastMessagePreview()}
            </p>
            {chat.unreadCount > 0 && (
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full px-2 py-1 min-w-5 text-center">
                {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};