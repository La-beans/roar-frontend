export type Article = {
  id: number;
  issue_id: number;
  author_id: number;
  title: string;
  content: string;
  author_name?: string;
  issue_title?: string;
  created_at?: string;
};
