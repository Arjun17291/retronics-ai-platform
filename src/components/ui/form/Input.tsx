import * as React from 'react';
import * as Label from '@radix-ui/react-label';
import * as Tooltip from '@radix-ui/react-tooltip';
import { AlertCircle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  tooltip?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, tooltip, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label.Root className="text-sm font-medium text-gray-700">
            {label}
          </Label.Root>
          {tooltip && (
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button className="text-gray-400 hover:text-gray-600">
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-white px-3 py-2 rounded-md shadow-lg border border-gray-200 text-sm max-w-xs"
                    sideOffset={5}
                  >
                    {tooltip}
                    <Tooltip.Arrow className="fill-white" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          )}
        </div>
        <div className="relative">
          <input
            ref={ref}
            className={clsx(
              'w-full rounded-md px-3 py-2 text-sm',
              'border border-gray-300 focus:border-blue-500',
              'outline-none focus:ring-2 focus:ring-blue-200',
              'transition-all duration-200',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-200',
              className
            )}
            {...props}
          />
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <AlertCircle className="w-4 h-4 text-red-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm text-red-500"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';