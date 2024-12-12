export interface AnalyticsOverview {
  totalFlows: number;
  activeFlows: number;
  totalConversations: number;
  activeUsers: number;
  llmCalls: number;
  avgResponseTime: number;
}

export interface FlowAnalytics {
  flowExecutions: {
    date: string;
    count: number;
  }[];
  successRate: number;
  avgExecutionTime: number;
  topFlows: {
    id: string;
    name: string;
    executions: number;
  }[];
}

export interface UsageAnalytics {
  llmUsage: {
    date: string;
    tokens: number;
    cost: number;
  }[];
  databaseQueries: {
    date: string;
    count: number;
  }[];
  totalCost: number;
  costBreakdown: {
    llm: number;
    database: number;
    storage: number;
  };
}