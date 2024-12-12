import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentService } from '../api/services/documentService';
import { DocumentFilter } from '../types/knowledge';

export const useDocuments = (filters?: DocumentFilter) => {
  const queryClient = useQueryClient();

  const documents = useQuery({
    queryKey: ['documents', filters],
    queryFn: () => documentService.getDocuments(filters),
  });

  const uploadDocument = useMutation({
    mutationFn: ({
      file,
      metadata,
    }: {
      file: File;
      metadata?: Record<string, any>;
    }) => documentService.uploadDocument(file, metadata),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

  const deleteDocument = useMutation({
    mutationFn: documentService.deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

  return {
    documents: documents.data ?? [],
    isLoading: documents.isLoading,
    error: documents.error,
    uploadDocument,
    deleteDocument,
  };
};