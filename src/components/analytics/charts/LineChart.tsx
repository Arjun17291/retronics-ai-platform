import React from 'react';
import { Card } from '../../common/Card';
import { format } from 'date-fns';

interface DataPoint {
  date: string;
  value: number;
}

interface LineChartProps {
  title: string;
  data: DataPoint[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  title,
  data,
  valueFormatter = (value) => value.toString(),
  className,
}) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));

  return (
    <Card className={className}>
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="h-64">
        <div className="relative h-full">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500">
            <span>{valueFormatter(maxValue)}</span>
            <span>{valueFormatter((maxValue + minValue) / 2)}</span>
            <span>{valueFormatter(minValue)}</span>
          </div>

          {/* Chart area */}
          <div className="absolute left-14 right-0 top-0 bottom-0">
            <svg className="w-full h-full">
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Grid lines */}
              {[...Array(5)].map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * (100 / 4) + "%"}
                  x2="100%"
                  y2={i * (100 / 4) + "%"}
                  stroke="#f3f4f6"
                  strokeWidth="1"
                />
              ))}

              {/* Data line */}
              {data.length > 1 && (
                <>
                  <path
                    d={`M ${data.map((d, i) => `${(i / (data.length - 1)) * 100}% ${100 - ((d.value - minValue) / (maxValue - minValue)) * 100}%`).join(" L ")}`}
                    fill="none"
                    stroke="rgb(59, 130, 246)"
                    strokeWidth="2"
                  />
                  <path
                    d={`M ${data.map((d, i) => `${(i / (data.length - 1)) * 100}% ${100 - ((d.value - minValue) / (maxValue - minValue)) * 100}%`).join(" L ")} L 100% 100% L 0 100%`}
                    fill="url(#gradient)"
                  />
                </>
              )}

              {/* Data points */}
              {data.map((d, i) => (
                <circle
                  key={i}
                  cx={`${(i / (data.length - 1)) * 100}%`}
                  cy={`${100 - ((d.value - minValue) / (maxValue - minValue)) * 100}%`}
                  r="4"
                  fill="rgb(59, 130, 246)"
                  className="hover:r-6 transition-all cursor-pointer"
                />
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        {data.map((d, i) => (
          <span key={i}>{format(new Date(d.date), 'MMM d')}</span>
        ))}
      </div>
    </Card>
  );
};