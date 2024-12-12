import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { flowService } from '../api/services/flowService';
import { CreateFlowInput, UpdateFlowInput } from '../types/flow';

export const useFlows = () => {
  const queryClient = useQueryClient();

  const flows = useQuery({
    queryKey: ['flows'],
    queryFn: flowService.getFlows,
  });

  const createFlow = useMutation({
    mutationFn: (input: CreateFlowInput) => flowService.createFlow(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flows'] });
    },
  });

  const updateFlow = useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateFlowInput }) =>
      flowService.updateFlow(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flows'] });
    },
  });

  const deleteFlow = useMutation({
    mutationFn: flowService.deleteFlow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flows'] });
    },
  });

  return {
    flows: flows.data ?? [],
    isLoading: flows.isLoading,
    error: flows.error,
    createFlow,
    updateFlow,
    deleteFlow,
  };
};