import React from 'react';
import { Plus, Users, Pencil, Trash2 } from 'lucide-react';
import { Button } from '../components/Button';

export const Personas: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Customer Personas</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Persona
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Technical User</h3>
                  <p className="text-sm text-gray-500">Developer / Engineer</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Pencil className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Characteristics</h4>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  <li>• Highly technical background</li>
                  <li>• Values detailed documentation</li>
                  <li>• Prefers self-service solutions</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700">Communication Style</h4>
                <p className="mt-1 text-sm text-gray-600">
                  Direct and technical, uses industry terminology
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-500 rounded-full h-2 w-3/4"></div>
                  </div>
                  <span className="text-sm text-gray-600">75% match</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};