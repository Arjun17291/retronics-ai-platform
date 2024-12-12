import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as Label from '@radix-ui/react-label';
import { Check, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

interface SelectProps {
  label: string;
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ label, options, value, onChange, error }, ref) => {
    return (
      <div className="space-y-2">
        <Label.Root className="text-sm font-medium text-gray-700">
          {label}
        </Label.Root>
        <SelectPrimitive.Root value={value} onValueChange={onChange}>
          <SelectPrimitive.Trigger
            ref={ref}
            className={clsx(
              'inline-flex items-center justify-between',
              'w-full rounded-md px-3 py-2 text-sm',
              'border border-gray-300',
              'focus:outline-none focus:ring-2',
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : 'focus:border-blue-500 focus:ring-blue-200',
              'bg-white'
            )}
          >
            <SelectPrimitive.Value />
            <SelectPrimitive.Icon>
              <ChevronDown className="w-4 h-4" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200"
              position="popper"
              sideOffset={5}
            >
              <SelectPrimitive.Viewport className="p-1">
                {options.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    className={clsx(
                      'relative flex items-center px-8 py-2 text-sm',
                      'rounded-md cursor-pointer select-none',
                      'focus:outline-none focus:bg-blue-50'
                    )}
                  >
                    <SelectPrimitive.ItemText>
                      {option.label}
                    </SelectPrimitive.ItemText>
                    <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                      <Check className="w-4 h-4" />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';