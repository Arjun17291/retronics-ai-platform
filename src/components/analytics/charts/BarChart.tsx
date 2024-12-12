import React from 'react';
import { Card } from '../../common/Card';

interface DataPoint {
  label: string;
  value: number;
}

interface BarChartProps {
  title: string;
  data: DataPoint[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  title,
  data,
  valueFormatter = (value) => value.toString(),
  className,
}) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <Card className={className}>
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">{item.label}</span>
              <span className="text-gray-500">{valueFormatter(item.value)}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};