import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { postActions, postStore } from '../store/store';

export const CreatePost = () => {
  const navigate = useNavigate();
  const { loading, error } = useSnapshot(postStore);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    postActions.setError('');
    
    if (!title.trim() || !content.trim()) {
      postActions.setError('Title and content are required');
      return;
    }
    
    if (content.length < 3) {
      postActions.setError('Content must be at least 3 characters');
      return;
    }
    
    try {
      await postActions.createPost({ title, content });
      if (!postStore.error) {
        navigate('/');
      }
    } catch (err) {
    }
  };

  return (
    <div className="container">
      <div className="post-card">
        <h2>Create New Post</h2>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">

            <label>Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="textarea"
            />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="textarea"
              rows={8}
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
};