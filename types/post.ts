export interface Post {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  publishedAt?: string;
  content?: string;
  author?: {
    id: number;
    documentId: string;
    name: string;
  };
  categories?: Array<{
    id: number;
    documentId: string;
    name: string;
  }>;
  tags?: Array<{
    id: number;
    documentId: string;
    name: string;
  }>;
  cover?: {
    id: number;
    documentId: string;
    url: string;
  };
}
