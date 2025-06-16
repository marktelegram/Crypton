import React, { useRef, useEffect } from 'react';
import { Chat, Message, User } from '../types';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { Phone, Video, MoreHorizontal, Search } from 'lucide-react';

interface ChatAreaProps {
  chat: Chat;
  currentUser: User;
  onSendMessage: (content: string, type?: 'text' | 'image' | 'voice' | 'file') => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ chat, currentUser, onSendMessage }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat.messages]);

  const getOtherParticipant = () => {
    return chat.participants.find(p => p.id !== currentUser.id);
  };

  const otherParticipant = getOtherParticipant();

  const renderHeader = () => (
    <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="flex items-center space-x-3">
        <img
          src={chat.avatar}
          alt={chat.title}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
        />
        <div>
          <h2 className="font-semibold text-white">{chat.title}</h2>
          <p className="text-sm text-gray-400">
            {chat.type === 'group' 
              ? `${chat.participants.length} members`
              : otherParticipant?.isOnline 
                ? 'online' 
                : otherParticipant?.lastSeen 
                  ? `last seen ${otherParticipant.lastSeen.toLocaleTimeString()}`
                  : 'offline'
            }
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Search size={20} className="text-gray-300" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Phone size={20} className="text-gray-300" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Video size={20} className="text-gray-300" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <MoreHorizontal size={20} className="text-gray-300" />
        </button>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {chat.messages.map((message, index) => {
        const sender = chat.participants.find(p => p.id === message.senderId) || currentUser;
        const isOwn = message.senderId === currentUser.id;
        const showAvatar = !isOwn && (
          index === 0 || 
          chat.messages[index - 1].senderId !== message.senderId
        );

        return (
          <MessageBubble
            key={message.id}
            message={message}
            sender={sender}
            isOwn={isOwn}
            showAvatar={showAvatar}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {renderHeader()}
        {renderMessages()}
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};