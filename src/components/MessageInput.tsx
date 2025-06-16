import React, { useState, useRef } from 'react';
import { Send, Paperclip, Mic, Smile, X } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string, type?: 'text' | 'image' | 'voice' | 'file') => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        onSendMessage(`Shared an image: ${file.name}`, 'image');
      } else {
        onSendMessage(`Shared a file: ${file.name}`, 'file');
      }
      setShowAttachMenu(false);
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false);
        onSendMessage('Voice message', 'voice');
      }, 2000);
    }
  };

  const attachmentOptions = [
    { icon: '📷', label: 'Photo', action: () => fileInputRef.current?.click() },
    { icon: '📁', label: 'File', action: () => fileInputRef.current?.click() },
    { icon: '🎵', label: 'Audio', action: () => {} },
    { icon: '📋', label: 'Poll', action: () => {} },
  ];

  return (
    <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-xl">
      {/* Attachment Menu */}
      {showAttachMenu && (
        <div className="mb-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-white">Attach</h3>
            <button
              onClick={() => setShowAttachMenu(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {attachmentOptions.map((option, index) => (
              <button
                key={index}
                onClick={option.action}
                className="flex flex-col items-center p-3 hover:bg-white/10 rounded-lg transition-colors"
              >
                <span className="text-2xl mb-1">{option.icon}</span>
                <span className="text-xs text-gray-300">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Voice Recording Indicator */}
      {isRecording && (
        <div className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm rounded-lg border border-red-500/30 flex items-center space-x-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-red-400 text-sm">Recording voice message...</span>
          <div className="flex-1"></div>
          <button
            onClick={() => setIsRecording(false)}
            className="text-red-400 hover:text-red-300"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none pr-12"
            disabled={isRecording}
          />
          <button
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <Smile size={20} />
          </button>
        </div>

        <button
          onClick={() => setShowAttachMenu(!showAttachMenu)}
          className={`p-3 rounded-full transition-all ${
            showAttachMenu 
              ? 'bg-purple-500 text-white' 
              : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
          }`}
        >
          <Paperclip size={20} />
        </button>

        <button
          onClick={handleVoiceRecord}
          className={`p-3 rounded-full transition-all ${
            isRecording 
              ? 'bg-red-500 text-white' 
              : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
          }`}
        >
          <Mic size={20} />
        </button>

        <button
          onClick={handleSend}
          disabled={!message.trim() || isRecording}
          className={`p-3 rounded-full transition-all ${
            message.trim() && !isRecording
              ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:shadow-lg transform hover:scale-105'
              : 'bg-white/10 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send size={20} />
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileUpload}
        className="hidden"
        accept="image/*,*"
      />
    </div>
  );
};