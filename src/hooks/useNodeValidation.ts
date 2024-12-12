import { useCallback, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { z } from 'zod';
import { NodeData, NodeType } from '../types/flow';

const validationSchemas = {
  llm: z.object({
    provider: z.enum(['openai', 'anthropic', 'google-ai', 'huggingface']),
    model: z.string().min(1, 'Model is required'),
    temperature: z.number().min(0).max(1),
    maxTokens: z.number().positive(),
    prompt: z.string().min(1, 'Prompt is required'),
  }),
  tool: z.object({
    type: z.enum(['mysql', 'mongodb']),
    connection: z.object({
      host: z.string().min(1, 'Host is required'),
      port: z.number().positive(),
      database: z.string().min(1, 'Database name is required'),
      username: z.string().min(1, 'Username is required'),
      password: z.string().min(1, 'Password is required'),
    }),
    query: z.string().min(1, 'Query is required'),
  }),
  // Add other node type schemas as needed
};

export const useNodeValidation = (type: NodeType, data: NodeData) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validate = useCallback(() => {
    const schema = validationSchemas[type];
    if (!schema) return true;

    try {
      schema.parse(data.configuration);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.errors.reduce((acc, curr) => ({
          ...acc,
          [curr.path.join('.')]: curr.message,
        }), {});
        setErrors(newErrors);
      }
      return false;
    }
  }, [type, data]);

  const [debouncedValidate] = useDebounce(validate, 300);

  return {
    errors,
    validate: debouncedValidate,
    hasErrors: Object.keys(errors).length > 0,
  };
};