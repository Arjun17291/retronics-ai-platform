import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  Brain,
  BookOpen,
  Users,
  Box,
  MessageSquare,
  Settings,
  HelpCircle,
  BarChart2
} from 'lucide-react';
import { clsx } from 'clsx';

const navigation = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'LangGraphs', path: '/flow', icon: Brain },
  { name: 'Knowledge Base', path: '/knowledge', icon: BookOpen },
  { name: 'Personas', path: '/personas', icon: Users },
  { name: 'Integrations', path: '/integrations', icon: Box },
  { name: 'Channels', path: '/channels', icon: MessageSquare },
  { name: 'Analytics', path: '/analytics', icon: BarChart2 },
];

const secondaryNavigation = [
  { name: 'Settings', path: '/settings', icon: Settings },
  { name: 'Help & Support', path: '/support', icon: HelpCircle },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-purple-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
            Retronics AI
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={clsx(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive(item.path)
                  ? 'bg-purple-50 text-purple-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        {secondaryNavigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={clsx(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive(item.path)
                  ? 'bg-purple-50 text-purple-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-medium">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              John Doe
            </p>
            <p className="text-xs text-gray-500 truncate">
              john@example.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};