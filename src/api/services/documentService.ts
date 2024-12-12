import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { Document, DocumentFilter } from '../../types/knowledge';

export const documentService = {
  getDocuments: async (filters?: DocumentFilter) => {
    const response = await apiClient.get<Document[]>(API_ENDPOINTS.DOCUMENTS, {
      params: filters,
    });
    return response.data;
  },

  getDocument: async (id: string) => {
    const response = await apiClient.get<Document>(API_ENDPOINTS.DOCUMENT(id));
    return response.data;
  },

  uploadDocument: async (file: File, metadata?: Record<string, any>) => {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }

    const response = await apiClient.post<Document>(
      API_ENDPOINTS.DOCUMENT_UPLOAD,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  deleteDocument: async (id: string) => {
    await apiClient.delete(API_ENDPOINTS.DOCUMENT(id));
  },
};