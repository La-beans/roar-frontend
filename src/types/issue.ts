export type Issue = {
  id: number;
  title: string;
  description?: string;
  cover_path?: string;   // from DB
  cover?: string;        // fallback / legacy
  published_at?: string;
  created_at?: string;
};
