import React, { memo, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { Brain, Database, FolderGit2, Cable, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { useFlowStore } from '../store/flowStore';
import { clsx } from 'clsx';
import { NodeSettings } from './NodeSettings/NodeSettings';
import { NodeWrapper } from './ui/NodeWrapper';
import { useNodeValidation } from '../hooks/useNodeValidation';
import { useNodeSpacing } from '../hooks/useNodeSpacing';
import { motion, AnimatePresence } from 'framer-motion';

// ... (keep existing iconMap and bgColorMap)
const iconMap = {
  llm: Brain,
  tool: Database,
  branch: FolderGit2,
  input: Cable,
  output: Cable,
};

const bgColorMap = {
  llm: 'bg-purple-50 hover:bg-purple-100',
  tool: 'bg-red-50 hover:bg-red-100',
  branch: 'bg-yellow-50 hover:bg-yellow-100',
  input: 'bg-blue-50 hover:bg-blue-100',
  output: 'bg-green-50 hover:bg-green-100',
};

const borderColorMap = {
  llm: 'border-purple-200',
  tool: 'border-red-200',
  branch: 'border-yellow-200',
  input: 'border-blue-200',
  output: 'border-green-200',
};

const CustomNode = ({ id, data }: { id: string; data: NodeData }) => {
  const Icon = iconMap[data.type];
  const { toggleNodeExpansion } = useFlowStore();
  const { errors, validate, hasErrors } = useNodeValidation(data.type, data);
  const { recalculateNodePositions } = useNodeSpacing();

  useEffect(() => {
    validate();
  }, [data.configuration, validate]);

  const handleExpand = () => {
    toggleNodeExpansion(id);
    // recalculateNodePositions(id);
  };

  return (
    <NodeWrapper
      isExpanded={data.isExpanded}
      hasError={hasErrors}
      className={bgColorMap[data.type]}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className={clsx(
              'w-5 h-5',
              {
                'text-purple-500': data.type === 'llm',
                'text-red-500': data.type === 'tool',
                'text-yellow-500': data.type === 'branch',
                'text-blue-500': data.type === 'input',
                'text-green-500': data.type === 'output',
              }
            )} />
            <span className="font-medium text-sm">{data.label}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {hasErrors && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative group"
                >
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <div className="absolute bottom-full mb-2 hidden group-hover:block">
                    <div className="bg-white p-2 rounded shadow-lg border border-gray-200 text-sm">
                      <ul className="list-disc list-inside">
                        {Object.values(errors).map((error, index) => (
                          <li key={index} className="text-red-500">{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <button
              onClick={handleExpand}
              className="text-gray-500 hover:text-gray-700"
            >
              {data.isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
        
        <AnimatePresence>
          {data.isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 border-t border-gray-200 pt-4"
            >
              <NodeSettings nodeId={id} type={data.type} config={data.configuration} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </NodeWrapper>
  );
};

export default memo(CustomNode);