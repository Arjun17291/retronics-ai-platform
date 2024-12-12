import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '../api/services/analyticsService';

export const useAnalytics = () => {
  const overview = useQuery({
    queryKey: ['analytics', 'overview'],
    queryFn: analyticsService.getOverview,
  });

  const flowAnalytics = useQuery({
    queryKey: ['analytics', 'flows'],
    queryFn: () => analyticsService.getFlowAnalytics(),
  });

  const usageAnalytics = useQuery({
    queryKey: ['analytics', 'usage'],
    queryFn: () => analyticsService.getUsageAnalytics(),
  });

  return {
    overview: overview.data,
    flowAnalytics: flowAnalytics.data,
    usageAnalytics: usageAnalytics.data,
    isLoading:
      overview.isLoading || flowAnalytics.isLoading || usageAnalytics.isLoading,
    error: overview.error || flowAnalytics.error || usageAnalytics.error,
  };
};