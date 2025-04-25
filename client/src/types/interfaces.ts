export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  postId: number;
}

export interface PostState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string;
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  totalPosts: number;
  sortBy: 'newest' | 'comments';
}