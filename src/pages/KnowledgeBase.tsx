import React, { useState } from 'react';
import { Plus, Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/ui/form/Input';
import { DocumentUploader } from '../components/knowledge/DocumentUploader';
import { DocumentCard } from '../components/knowledge/DocumentCard';
import { Document } from '../types/knowledge';

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Product Documentation.pdf',
    type: 'pdf',
    size: 2500000,
    uploadedAt: '2024-03-10T10:00:00Z',
    description: 'Comprehensive guide covering product features, specifications, and troubleshooting steps.',
    status: 'processed',
    url: '/docs/product-doc.pdf',
  },
  {
    id: '2',
    name: 'API Reference.docx',
    type: 'docx',
    size: 1800000,
    uploadedAt: '2024-03-09T15:30:00Z',
    description: 'Complete API documentation with endpoints, parameters, and example responses.',
    status: 'processed',
    url: '/docs/api-ref.docx',
  },
  {
    id: '3',
    name: 'Release Notes.txt',
    type: 'txt',
    size: 500000,
    uploadedAt: '2024-03-08T09:15:00Z',
    description: 'Latest release notes detailing new features, improvements, and bug fixes.',
    status: 'processing',
    url: '/docs/release-notes.txt',
  },
];

export const KnowledgeBase: React.FC = () => {
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [search, setSearch] = useState('');

  const handleUpload = (files: File[]) => {
    // Handle file upload logic here
    console.log('Uploading files:', files);
    setIsUploaderOpen(false);
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="mt-1 text-gray-500">
            {documents.length} document{documents.length !== 1 ? 's' : ''} • {documents.filter(d => d.status === 'processed').length} processed
          </p>
        </div>
        <Button
          variant="primary"
          className="flex items-center gap-2"
          onClick={() => setIsUploaderOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Add Document
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Button variant="secondary" className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      <DocumentUploader
        isOpen={isUploaderOpen}
        onClose={() => setIsUploaderOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
};