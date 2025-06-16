import React from 'react';
import { X, User, Bell, Lock, Palette, Moon, Languages, BadgeHelp as Help } from 'lucide-react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
}

export const Settings: React.FC<SettingsProps> = ({ isOpen, onClose, currentUser }) => {
  if (!isOpen) return null;

  const settingsOptions = [
    { icon: User, label: 'Profile', description: 'Change your name, username and bio' },
    { icon: Bell, label: 'Notifications', description: 'Configure notification preferences' },
    { icon: Lock, label: 'Privacy & Security', description: 'Manage your privacy settings' },
    { icon: Palette, label: 'Appearance', description: 'Customize theme and colors' },
    { icon: Moon, label: 'Dark Mode', description: 'Toggle dark mode on/off' },
    { icon: Languages, label: 'Language', description: 'Choose your preferred language' },
    { icon: Help, label: 'Help & Support', description: 'Get help and contact support' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-300" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-500"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-white">{currentUser.name}</h3>
              <p className="text-sm text-gray-400">{currentUser.username}</p>
              <p className="text-sm text-gray-300 mt-1">{currentUser.bio}</p>
            </div>
          </div>
        </div>

        {/* Settings Options */}
        <div className="p-4">
          {settingsOptions.map((option, index) => (
            <button
              key={index}
              className="w-full flex items-center space-x-4 p-4 hover:bg-white/5 rounded-lg transition-colors"
            >
              <div className="p-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg">
                <option.icon size={20} className="text-purple-400" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-medium text-white">{option.label}</h4>
                <p className="text-sm text-gray-400">{option.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 text-center">
          <p className="text-sm text-gray-400">Crypton v1.0.0</p>
          <p className="text-xs text-gray-500 mt-1">
            Built with love ❤️ for secure communication
          </p>
        </div>
      </div>
    </div>
  );
};