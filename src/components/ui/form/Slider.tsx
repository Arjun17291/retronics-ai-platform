import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as Label from '@radix-ui/react-label';
import { clsx } from 'clsx';

interface SliderProps {
  label: string;
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
}

export const Slider = React.forwardRef<HTMLSpanElement, SliderProps>(
  ({ label, value, onValueChange, min = 0, max = 100, step = 1, error }, ref) => {
    return (
      <div className="space-y-2">
        <Label.Root className="text-sm font-medium text-gray-700">
          {label}
        </Label.Root>
        <SliderPrimitive.Root
          ref={ref}
          className="relative flex items-center select-none touch-none w-full h-5"
          value={value}
          onValueChange={onValueChange}
          min={min}
          max={max}
          step={step}
        >
          <SliderPrimitive.Track
            className={clsx(
              'relative grow rounded-full h-2',
              error ? 'bg-red-100' : 'bg-gray-200'
            )}
          >
            <SliderPrimitive.Range
              className={clsx(
                'absolute h-full rounded-full',
                error ? 'bg-red-500' : 'bg-blue-500'
              )}
            />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            className={clsx(
              'block w-5 h-5 rounded-full',
              'focus:outline-none focus:ring-2',
              error
                ? 'bg-red-500 focus:ring-red-200'
                : 'bg-blue-500 focus:ring-blue-200'
            )}
          />
        </SliderPrimitive.Root>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Slider.displayName = 'Slider';