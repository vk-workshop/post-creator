import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnapshot } from 'valtio';
import { postActions, postStore } from '../store/store';

export const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentPost, loading, error } = useSnapshot(postStore);
  const [title, setTitle] = useState(currentPost?.title || '');
  const [content, setContent] = useState(currentPost?.content || '');

  useEffect(() => {
    if (id) postActions.fetchPost(parseInt(id));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      postActions.setError('Title and content are required');
      return;
    }
    
    if (content.length < 3) {
      postActions.setError('Content must be at least 3 characters');
      return;
    }

    if (id) {
      await postActions.updatePost(parseInt(id), { title, content });
      navigate(`/posts/${id}`);
    }
  };

  return (
    <div className="container">
      <div className="post-card">

        <h2>Edit Post</h2>

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