import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { Flow, CreateFlowInput, UpdateFlowInput } from '../../types/flow';

export const flowService = {
  getFlows: async () => {
    const response = await apiClient.get<Flow[]>(API_ENDPOINTS.FLOWS);
    return response.data;
  },

  getFlow: async (id: string) => {
    const response = await apiClient.get<Flow>(API_ENDPOINTS.FLOW(id));
    return response.data;
  },

  createFlow: async (input: CreateFlowInput) => {
    const response = await apiClient.post<Flow>(API_ENDPOINTS.FLOWS, input);
    return response.data;
  },

  updateFlow: async (id: string, input: UpdateFlowInput) => {
    const response = await apiClient.put<Flow>(API_ENDPOINTS.FLOW(id), input);
    return response.data;
  },

  deleteFlow: async (id: string) => {
    await apiClient.delete(API_ENDPOINTS.FLOW(id));
  },

  validateFlow: async (id: string) => {
    const response = await apiClient.post<{ valid: boolean; errors?: string[] }>(
      API_ENDPOINTS.VALIDATE_FLOW(id)
    );
    return response.data;
  },

  executeFlow: async (id: string, input: Record<string, any>) => {
    const response = await apiClient.post(API_ENDPOINTS.EXECUTE_FLOW(id), input);
    return response.data;
  },
};