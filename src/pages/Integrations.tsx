import React from 'react';
import { Plus, Box, CheckCircle2, ExternalLink } from 'lucide-react';
import { Button } from '../components/Button';

const integrations = [
  {
    name: 'Slack',
    description: 'Connect your Slack workspace for real-time notifications and updates.',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/slack.svg',
    connected: true,
  },
  {
    name: 'Zendesk',
    description: 'Sync customer support tickets and conversations.',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/zendesk.svg',
    connected: false,
  },
  {
    name: 'Salesforce',
    description: 'Integrate with your CRM for customer data and insights.',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/salesforce.svg',
    connected: true,
  },
];

export const Integrations: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="mt-1 text-gray-500">Connect your tools and services</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Integration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div key={integration.name} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg p-2">
                  <img
                    src={integration.icon}
                    alt={integration.name}
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{integration.name}</h3>
                  <p className="text-sm text-gray-500">{integration.description}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              {integration.connected ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Connected</span>
                  </div>
                  <Button variant="secondary" size="sm">Configure</Button>
                </div>
              ) : (
                <Button variant="primary" className="w-full">Connect</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};