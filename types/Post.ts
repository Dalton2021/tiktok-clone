import User from './User';

export default interface Post {
  id: string;
  video_url: string;
  thumbnail_url?: string;
  likes: number;
  comments: number;
  saves: number;
  shares: number;
  tags?: string[];
  caption: string;
  user_id: string;
  user?: User; // Navigation property for included user data
  created_at: string;
  duration?: number;
}
