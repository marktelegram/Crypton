import { useState, useCallback } from 'react';
import { Chat, Message, User, ChatState } from '../types';
import { chats as initialChats, currentUser } from '../utils/mockData';

export const useChat = () => {
  const [state, setState] = useState<ChatState>({
    currentChat: initialChats[0],
    chats: initialChats,
    currentUser,
    isTyping: false,
    searchQuery: ''
  });

  const setCurrentChat = useCallback((chat: Chat) => {
    setState(prev => ({
      ...prev,
      currentChat: chat
    }));
  }, []);

  const sendMessage = useCallback((content: string, type: 'text' | 'image' | 'voice' | 'file' = 'text') => {
    if (!state.currentChat || !content.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      content: content.trim(),
      timestamp: new Date(),
      type,
      isRead: false
    };

    setState(prev => ({
      ...prev,
      chats: prev.chats.map(chat =>
        chat.id === prev.currentChat?.id
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: newMessage
            }
          : chat
      ),
      currentChat: prev.currentChat
        ? {
            ...prev.currentChat,
            messages: [...prev.currentChat.messages, newMessage],
            lastMessage: newMessage
          }
        : null
    }));

    // Simulate response after a delay
    setTimeout(() => {
      const responses = [
        "That's interesting!",
        "I completely agree 👍",
        "Thanks for sharing!",
        "Really? Tell me more!",
        "Sounds great! 😊"
      ];
      
      const responseMessage: Message = {
        id: `msg-${Date.now()}-response`,
        senderId: state.currentChat?.participants.find(p => p.id !== currentUser.id)?.id || '',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: 'text',
        isRead: false
      };

      setState(prev => ({
        ...prev,
        chats: prev.chats.map(chat =>
          chat.id === prev.currentChat?.id
            ? {
                ...chat,
                messages: [...chat.messages, responseMessage],
                lastMessage: responseMessage
              }
            : chat
        ),
        currentChat: prev.currentChat
          ? {
              ...prev.currentChat,
              messages: [...prev.currentChat.messages, responseMessage],
              lastMessage: responseMessage
            }
          : null
      }));
    }, 1000 + Math.random() * 2000);
  }, [state.currentChat]);

  const setSearchQuery = useCallback((query: string) => {
    setState(prev => ({
      ...prev,
      searchQuery: query
    }));
  }, []);

  const toggleChatPin = useCallback((chatId: string) => {
    setState(prev => ({
      ...prev,
      chats: prev.chats.map(chat =>
        chat.id === chatId
          ? { ...chat, isPinned: !chat.isPinned }
          : chat
      )
    }));
  }, []);

  const markAsRead = useCallback((chatId: string) => {
    setState(prev => ({
      ...prev,
      chats: prev.chats.map(chat =>
        chat.id === chatId
          ? { ...chat, unreadCount: 0 }
          : chat
      )
    }));
  }, []);

  return {
    ...state,
    setCurrentChat,
    sendMessage,
    setSearchQuery,
    toggleChatPin,
    markAsRead
  };
};