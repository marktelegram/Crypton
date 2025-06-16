import { User, Chat, Message } from '../types';

export const currentUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  username: '@alexj',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
  isOnline: true,
  bio: 'Building the future, one line at a time 🚀'
};

export const users: User[] = [
  {
    id: 'user-2',
    name: 'Sarah Chen',
    username: '@sarahc',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    isOnline: true,
    bio: 'Design is not just what it looks like. Design is how it works.'
  },
  {
    id: 'user-3',
    name: 'Mike Rodriguez',
    username: '@mikerod',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 15),
    bio: 'Coffee enthusiast ☕ | Tech lover 💻'
  },
  {
    id: 'user-4',
    name: 'Emma Thompson',
    username: '@emmat',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60),
    bio: 'Photographer 📸 | Traveler 🌍'
  },
  {
    id: 'user-5',
    name: 'David Park',
    username: '@davidp',
    avatar: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=400',
    isOnline: true,
    bio: 'Entrepreneur | Building tomorrow today'
  }
];

const generateMessages = (chatId: string, participantIds: string[]): Message[] => {
  const messages: Message[] = [];
  const messageContents = [
    "Hey! How's your day going?",
    "Just finished working on the new project 🚀",
    "That sounds amazing! Can't wait to see it",
    "Thanks! I'll share some screenshots soon",
    "Perfect! Let me know if you need any help",
    "Will do! By the way, are you free for coffee tomorrow?",
    "Absolutely! What time works for you?",
    "How about 2 PM at the usual place?",
    "Sounds perfect! See you there ☕",
    "Looking forward to it! 😊"
  ];

  messageContents.forEach((content, index) => {
    messages.push({
      id: `msg-${chatId}-${index}`,
      senderId: index % 2 === 0 ? participantIds[0] : participantIds[1],
      content,
      timestamp: new Date(Date.now() - (messageContents.length - index) * 60000),
      type: 'text',
      isRead: Math.random() > 0.3,
      reactions: Math.random() > 0.7 ? [
        {
          emoji: ['👍', '❤️', '😊', '🔥'][Math.floor(Math.random() * 4)],
          count: Math.floor(Math.random() * 3) + 1,
          users: [participantIds[Math.floor(Math.random() * participantIds.length)]]
        }
      ] : undefined
    });
  });

  return messages;
};

export const chats: Chat[] = users.map((user, index) => ({
  id: `chat-${user.id}`,
  type: 'private' as const,
  title: user.name,
  avatar: user.avatar,
  participants: [currentUser, user],
  messages: generateMessages(`chat-${user.id}`, [currentUser.id, user.id]),
  unreadCount: Math.floor(Math.random() * 5),
  isPinned: index < 2,
  isMuted: false
}));

// Add group chat
chats.unshift({
  id: 'group-1',
  type: 'group',
  title: 'Design Team',
  avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
  participants: [currentUser, ...users.slice(0, 3)],
  messages: [
    {
      id: 'group-msg-1',
      senderId: users[0].id,
      content: 'Great work on the latest designs everyone! 🎨',
      timestamp: new Date(Date.now() - 300000),
      type: 'text',
      isRead: true
    },
    {
      id: 'group-msg-2',
      senderId: currentUser.id,
      content: 'Thanks! Really excited about this direction',
      timestamp: new Date(Date.now() - 240000),
      type: 'text',
      isRead: true
    }
  ],
  unreadCount: 2,
  isPinned: true,
  isMuted: false
});