import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useReactFlow } from 'reactflow';

interface NodeWrapperProps {
  children: React.ReactNode;
  isExpanded: boolean;
  hasError?: boolean;
  className?: string;
}

export const NodeWrapper: React.FC<NodeWrapperProps> = ({
  children,
  isExpanded,
  hasError,
  className,
}) => {
  const { getZoom } = useReactFlow();
  const zoom = getZoom();

  return (
    <motion.div
      layout
      initial={false}
      animate={{
        width: isExpanded ? 400 : 200,
        scale: Math.max(1, 1 / zoom),
      }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 200,
      }}
      className={clsx(
        'shadow-lg rounded-md transition-colors',
        hasError ? 'border-2 border-red-500' : 'border border-gray-200',
        className
      )}
      style={{
        transformOrigin: 'center center',
        minHeight: '100px',
      }}
    >
      {children}
    </motion.div>
  );
};