export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'docx' | 'txt';
  size: number;
  uploadedAt: string;
  description: string;
  status: 'processing' | 'processed';
  url: string;
}

export interface DocumentFilter {
  search: string;
  type?: string[];
  status?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}