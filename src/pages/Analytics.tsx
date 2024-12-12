import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { AnalyticsCard } from '../components/analytics/AnalyticsCard';
import { LineChart } from '../components/analytics/charts/LineChart';
import { BarChart } from '../components/analytics/charts/BarChart';
import { UsageBreakdown } from '../components/analytics/UsageBreakdown';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { useAnalytics } from '../hooks/useAnalytics';
import { Brain, MessageSquare, Users, Zap } from 'lucide-react';
import { format, subDays } from 'date-fns';

export const Analytics: React.FC = () => {
  const { overview, flowAnalytics, usageAnalytics, isLoading, error } = useAnalytics();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Generate sample data for the charts
  const conversationData = Array.from({ length: 7 }, (_, i) => ({
    date: format(subDays(new Date(), i), 'yyyy-MM-dd'),
    value: Math.floor(Math.random() * 1000),
  })).reverse();

  const topFlows = [
    { label: 'Customer Support', value: 1234 },
    { label: 'Lead Generation', value: 856 },
    { label: 'Product FAQ', value: 654 },
    { label: 'Appointment Booking', value: 432 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Monitor your AI performance and usage"
        stats={[
          { label: 'Total Flows', value: overview?.totalFlows || 0 },
          { label: 'Active Flows', value: overview?.activeFlows || 0 },
        ]}
      />

      <ErrorBoundary>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnalyticsCard
            title="Total Conversations"
            value={overview?.totalConversations.toLocaleString() || '0'}
            change={{ value: 12, trend: 'up' }}
            icon={MessageSquare}
          />
          <AnalyticsCard
            title="Active Users"
            value={overview?.activeUsers.toLocaleString() || '0'}
            change={{ value: 8, trend: 'up' }}
            icon={Users}
          />
          <AnalyticsCard
            title="LLM Calls"
            value={overview?.llmCalls.toLocaleString() || '0'}
            change={{ value: 5, trend: 'down' }}
            icon={Brain}
          />
          <AnalyticsCard
            title="Avg Response Time"
            value={`${overview?.avgResponseTime.toFixed(2)}s` || '0s'}
            change={{ value: 15, trend: 'up' }}
            icon={Zap}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChart
            title="Conversations Over Time"
            data={conversationData}
            valueFormatter={(value) => value.toLocaleString()}
          />
          <BarChart
            title="Top Performing Flows"
            data={topFlows}
            valueFormatter={(value) => value.toLocaleString()}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <UsageBreakdown
            data={usageAnalytics?.costBreakdown || {
              llm: 0,
              database: 0,
              storage: 0,
            }}
          />
          {/* Add more analytics components here */}
        </div>
      </ErrorBoundary>
    </div>
  );
};