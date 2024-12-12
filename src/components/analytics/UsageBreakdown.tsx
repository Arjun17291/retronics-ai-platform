import React from 'react';
import { Card } from '../common/Card';
import { Database, Brain, HardDrive } from 'lucide-react';

interface UsageBreakdownProps {
  data: {
    llm: number;
    database: number;
    storage: number;
  };
}

export const UsageBreakdown: React.FC<UsageBreakdownProps> = ({ data }) => {
  const total = data.llm + data.database + data.storage;
  const items = [
    { label: 'LLM Usage', value: data.llm, icon: Brain, color: 'bg-purple-500' },
    { label: 'Database', value: data.database, icon: Database, color: 'bg-blue-500' },
    { label: 'Storage', value: data.storage, icon: HardDrive, color: 'bg-green-500' },
  ];

  return (
    <Card>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Usage Breakdown</h3>
      <div className="space-y-4">
        {items.map((item) => {
          const percentage = (item.value / total) * 100;
          const Icon = item.icon;
          
          return (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ${item.value.toFixed(2)} ({percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};