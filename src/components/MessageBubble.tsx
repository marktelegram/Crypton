import React from 'react';
import { Message, User } from '../types';
import { Check, CheckCheck, Smile, Forward, Reply } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  sender: User;
  isOwn: boolean;
  showAvatar: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  sender,
  isOwn,
  showAvatar
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="rounded-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Shared image"
              className="max-w-sm max-h-64 object-cover"
            />
            {message.content && (
              <p className="mt-2 text-sm">{message.content}</p>
            )}
          </div>
        );
      case 'voice':
        return (
          <div className="flex items-center space-x-3 py-2">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"></div>
            </div>
            <div className="flex-1">
              <div className="h-8 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-full flex items-center px-3">
                <div className="h-1 bg-white/50 rounded-full flex-1"></div>
              </div>
            </div>
            <span className="text-xs text-gray-300">{message.duration || 15}s</span>
          </div>
        );
      case 'file':
        return (
          <div className="flex items-center space-x-3 py-2">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              📎
            </div>
            <div>
              <p className="font-medium">{message.fileName || 'Document.pdf'}</p>
              <p className="text-xs text-gray-300">{message.fileSize || '2.5 MB'}</p>
            </div>
          </div>
        );
      default:
        return <p className="text-sm leading-relaxed">{message.content}</p>;
    }
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4 group`}>
      <div className={`flex max-w-xs lg:max-w-md ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
        {showAvatar && !isOwn && (
          <img
            src={sender.avatar}
            alt={sender.name}
            className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0"
          />
        )}
        
        <div className={`${showAvatar && !isOwn ? '' : isOwn ? 'mr-2' : 'ml-10'}`}>
          {message.forwarded && (
            <div className="flex items-center text-xs text-gray-400 mb-1">
              <Forward size={12} className="mr-1" />
              Forwarded
            </div>
          )}
          
          {message.replyTo && (
            <div className="bg-white/5 border-l-2 border-purple-400 p-2 mb-2 rounded">
              <p className="text-xs text-purple-400 font-medium">{sender.name}</p>
              <p className="text-xs text-gray-300 truncate">{message.replyTo.content}</p>
            </div>
          )}

          <div
            className={`px-4 py-2 rounded-2xl backdrop-blur-sm ${
              isOwn
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                : 'bg-white/10 text-white border border-white/20'
            }`}
          >
            {renderMessageContent()}
            
            <div className={`flex items-center justify-between mt-2 text-xs ${
              isOwn ? 'text-white/70' : 'text-gray-400'
            }`}>
              <span>{formatTime(message.timestamp)}</span>
              {isOwn && (
                <div className="ml-2">
                  {message.isRead ? (
                    <CheckCheck size={14} className="text-green-400" />
                  ) : (
                    <Check size={14} />
                  )}
                </div>
              )}
            </div>
          </div>

          {message.reactions && message.reactions.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {message.reactions.map((reaction, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1 text-xs"
                >
                  <span>{reaction.emoji}</span>
                  <span className="text-gray-300">{reaction.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Message actions */}
      <div className={`opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 ${
        isOwn ? 'mr-2' : 'ml-2'
      }`}>
        <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
          <Smile size={16} className="text-gray-400" />
        </button>
        <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
          <Reply size={16} className="text-gray-400" />
        </button>
        <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
          <Forward size={16} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
};