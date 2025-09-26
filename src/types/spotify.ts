export interface SpotifyLink {
  id: string;
  title: string;
  desc: string;
  duration: string;
  date: string;
  url: string;
  guests?: string[];
  coverImage?: string;
  videoLink?: string;
}
