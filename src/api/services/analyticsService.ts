import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { AnalyticsOverview, FlowAnalytics, UsageAnalytics } from '../../types/analytics';

export const analyticsService = {
  getOverview: async () => {
    const response = await apiClient.get<AnalyticsOverview>(
      API_ENDPOINTS.ANALYTICS_OVERVIEW
    );
    return response.data;
  },

  getFlowAnalytics: async (params?: {
    startDate?: string;
    endDate?: string;
    flowId?: string;
  }) => {
    const response = await apiClient.get<FlowAnalytics>(
      API_ENDPOINTS.ANALYTICS_FLOWS,
      { params }
    );
    return response.data;
  },

  getUsageAnalytics: async (params?: {
    startDate?: string;
    endDate?: string;
    type?: 'llm' | 'database' | 'all';
  }) => {
    const response = await apiClient.get<UsageAnalytics>(
      API_ENDPOINTS.ANALYTICS_USAGE,
      { params }
    );
    return response.data;
  },
};