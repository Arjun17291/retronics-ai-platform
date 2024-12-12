import React from 'react';
import { MessageSquare, Phone, Mail, Globe, BarChart2 } from 'lucide-react';
import { Button } from '../components/Button';

const channels = [
  {
    name: 'Web Chat',
    icon: MessageSquare,
    active: true,
    stats: {
      conversations: 1234,
      responseTime: '45s',
      satisfaction: 98,
    },
  },
  {
    name: 'Phone',
    icon: Phone,
    active: true,
    stats: {
      conversations: 567,
      responseTime: '2m',
      satisfaction: 95,
    },
  },
  {
    name: 'Email',
    icon: Mail,
    active: true,
    stats: {
      conversations: 890,
      responseTime: '4h',
      satisfaction: 92,
    },
  },
  {
    name: 'Website Widget',
    icon: Globe,
    active: false,
    stats: {
      conversations: 0,
      responseTime: '-',
      satisfaction: 0,
    },
  },
];

export const Channels: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communication Channels</h1>
          <p className="mt-1 text-gray-500">Manage your customer interaction channels</p>
        </div>
        <Button variant="primary">Configure Channels</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {channels.map((channel) => {
          const Icon = channel.icon;
          return (
            <div
              key={channel.name}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    channel.active ? 'bg-blue-50' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      channel.active ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{channel.name}</h3>
                    <span className={`inline-flex items-center px-2 py-1 mt-1 rounded-full text-xs font-medium ${
                      channel.active
                        ? 'bg-green-50 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {channel.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                >
                  Configure
                </Button>
              </div>

              {channel.active && (
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Conversations</div>
                    <div className="font-medium text-gray-900">
                      {channel.stats.conversations.toLocaleString()}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Avg. Response</div>
                    <div className="font-medium text-gray-900">
                      {channel.stats.responseTime}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Satisfaction</div>
                    <div className="font-medium text-gray-900">
                      {channel.stats.satisfaction}%
                    </div>
                  </div>
                </div>
              )}

              {channel.active && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <BarChart2 className="w-4 h-4 text-gray-400" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Load</span>
                        <span>75%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: '75%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};