export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  
  // Flows
  FLOWS: '/flows',
  FLOW: (id: string) => `/flows/${id}`,
  VALIDATE_FLOW: (id: string) => `/flows/${id}/validate`,
  EXECUTE_FLOW: (id: string) => `/flows/${id}/execute`,
  
  // Knowledge Base
  DOCUMENTS: '/documents',
  DOCUMENT: (id: string) => `/documents/${id}`,
  DOCUMENT_UPLOAD: '/documents/upload',
  
  // Personas
  PERSONAS: '/personas',
  PERSONA: (id: string) => `/personas/${id}`,
  
  // Analytics
  ANALYTICS_OVERVIEW: '/analytics/overview',
  ANALYTICS_FLOWS: '/analytics/flows',
  ANALYTICS_USAGE: '/analytics/usage',
  
  // Integrations
  INTEGRATIONS: '/integrations',
  INTEGRATION: (id: string) => `/integrations/${id}`,
  INTEGRATION_AUTH: (provider: string) => `/integrations/${provider}/auth`,
  
  // Channels
  CHANNELS: '/channels',
  CHANNEL: (id: string) => `/channels/${id}`,
  CHANNEL_STATS: (id: string) => `/channels/${id}/stats`,
} as const;