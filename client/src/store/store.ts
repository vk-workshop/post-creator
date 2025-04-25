import { CreateCommentDto } from './../../../nest-server/src/posts/dto/create-comment.dto';
import { UpdatePostDto } from './../../../nest-server/src/posts/dto/update-post.dto';
import { CreatePostDto } from './../../../nest-server/src/posts/dto/create-post.dto';
import { proxy } from 'valtio';
import { PostState } from '../types/interfaces';
import axios from 'axios';

export const postStore = proxy<PostState>({
  posts: [],
  currentPost: null,
  loading: false,
  error: '',
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 10,
  totalPosts: 0,
  sortBy: 'newest',
});

export const postActions = {
  setError(message: string) {
    postStore.error = message;
  },

  setSearchQuery(query: string) {
    postStore.searchQuery = query;
  },
  
  setCurrentPage(page: number) {
    postStore.currentPage = page;
  },
  
  setItemsPerPage(limit: number) {
    postStore.itemsPerPage = limit;
    postStore.currentPage = 1;
  },

  setSortBy(sort: 'newest' | 'comments') {
    postStore.sortBy = sort;
    postStore.currentPage = 1;
  },

  async fetchPosts() {
    try {
      postStore.loading = true;
      const { data } = await axios.get('/api/posts', {
        params: {
          page: postStore.currentPage,
          limit: postStore.itemsPerPage,
          search: postStore.searchQuery,
          sort: postStore.sortBy
        }
      });
      postStore.posts = Array.isArray(data.posts) ? data.posts : [];
      postStore.totalPosts = data.total ?? 0;
      postStore.error = '';
    } catch (err) {
      postStore.error = 'Failed to load posts. Please try again later.';
    } finally {
      postStore.loading = false;
    }
  },

  async fetchPost(id: number) {
    try {
      postStore.loading = true;
      const { data } = await axios.get(`/api/posts/${id}`);
      postStore.currentPost = data;
      postStore.error = '';
    } catch (err) {
      postStore.error = 'Post not found';
    } finally {
      postStore.loading = false;
    }
  },

  async createPost(postData: CreatePostDto) {
    try {
      postStore.loading = true;
      const { data } = await axios.post('/api/posts', postData);
      postStore.posts = [data, ...postStore.posts];
      postStore.error = '';
    } catch (err) {
      postStore.error = 'Failed to create post. Please try again.';
    } finally {
      postStore.loading = false;
    }
  },

  async updatePost(id: number, postData: UpdatePostDto) {
    try {
      postStore.loading = true;
      const { data } = await axios.put(`/api/posts/${id}`, postData);
      postStore.posts = postStore.posts.map(post => 
        post.id === id ? data : post
      );
      postStore.currentPost = data;
      postStore.error = '';
    } catch (err) {
      postStore.error = 'Failed to update post. Please try again.';
    } finally {
      postStore.loading = false;
    }
  },

  async deletePost(id: number) {
    try {
      postStore.loading = true;
      await axios.delete(`/api/posts/${id}`);
      postStore.posts = postStore.posts.filter(post => post.id !== id);
      postStore.error = '';
    } catch (err) {
      postStore.error = 'Failed to delete post';
    } finally {
      postStore.loading = false;
    }
  },

  async addComment(postId: number, commentData: CreateCommentDto) {
    try {
      postStore.loading = true;
      await axios.post(`/api/posts/${postId}/comments`, commentData);
      const { data } = await axios.get(`/api/posts/${postId}`);
      postStore.currentPost = data;
      postStore.error = '';
    } catch (err) {
      postStore.error = 'Failed to post comment';
    } finally {
      postStore.loading = false;
    }
  }
};