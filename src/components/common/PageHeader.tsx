import React from 'react';
import { Button } from '../Button';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
  };
  stats?: {
    label: string;
    value: string | number;
  }[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  action,
  stats,
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="mt-1 text-gray-500">{description}</p>
          )}
          {stats && (
            <dl className="mt-3 flex gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex gap-1">
                  <dt className="text-gray-500">{stat.label}:</dt>
                  <dd className="font-medium text-gray-900">{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        {action && (
          <Button
            variant="primary"
            onClick={action.onClick}
            className="flex items-center gap-2"
          >
            {action.icon && <action.icon className="w-4 h-4" />}
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
};