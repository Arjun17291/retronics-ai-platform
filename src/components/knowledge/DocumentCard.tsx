import React from 'react';
import { FileText, Download, Trash2, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Document } from '../../types/knowledge';

interface DocumentCardProps {
  document: Document;
  onDelete: (id: string) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document, onDelete }) => {
  const getFileIcon = () => {
    switch (document.type) {
      case 'pdf':
        return 'bg-red-50 text-red-600';
      case 'doc':
      case 'docx':
        return 'bg-blue-50 text-blue-600';
      case 'txt':
        return 'bg-gray-50 text-gray-600';
      default:
        return 'bg-purple-50 text-purple-600';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-500 transition-colors">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${getFileIcon()}`}>
          <FileText className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{document.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {formatDistanceToNow(new Date(document.uploadedAt), { addSuffix: true })} • 
            {(document.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm text-gray-600 line-clamp-2">
          {document.description}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            document.status === 'processed'
              ? 'bg-green-50 text-green-700'
              : 'bg-yellow-50 text-yellow-700'
          }`}>
            {document.status === 'processed' ? 'Processed' : 'Processing'}
          </span>
          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
            {document.type.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-1 text-gray-400 hover:text-blue-600"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            className="p-1 text-gray-400 hover:text-blue-600"
            title="View"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(document.id)}
            className="p-1 text-gray-400 hover:text-red-600"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};