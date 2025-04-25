import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSnapshot } from "valtio";
import { postActions, postStore } from "../store/store";

export const PostDetail = () => {
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const { id } = useParams();
  const { currentPost, loading, error } = useSnapshot(postStore);

  useEffect(() => {
    if (id) {
      postActions.fetchPost(parseInt(id));
    }
  }, [id]);

  const handleCommentSubmit = async () => {
    if (id && comment.trim()) {
      await postActions.addComment(parseInt(id), {
        content: comment,
        author: 'Anonymous'
      });
      setComment('');
    }
  };

  const handleDelete = async () => {
    if (id && window.confirm('Are you sure?')) {
      await postActions.deletePost(parseInt(id));
      navigate('/');
    }
  };

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
      <div className="post-card">
        <h1>{currentPost?.title}</h1>

        <div className="post-meta">
          <div className="post-meta-item">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm1 3v5h4v2h-6V7h2z"/>
            </svg>
            {currentPost?.createdAt ? new Date(currentPost.createdAt).toLocaleString() : ''}
          </div>
          
          <div className="post-meta-item">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm8.5-5v2h3V7h-3zm0 4v6h3v-6h-3z"/>
            </svg>
            {currentPost?.comments?.length || 0} comments
          </div>
        </div>

        <div className="post-actions">
          <Link to={`/posts/${currentPost?.id}/edit`} className="btn btn-secondary btn-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
            Edit Post
          </Link>

          <button onClick={handleDelete} className="btn btn-danger btn-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>

        <div className="post-content">
          {currentPost?.content.split('\n\n').map((section, index) => (
            <div key={index}>
              {section.split('\n').map((para, pIndex) => (
                <p key={pIndex}>{para}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="comment-section">
          <h3>Comments ({currentPost?.comments?.length || 0})</h3>
          
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="textarea"
            rows={4}
          />
          <button 
            onClick={handleCommentSubmit}
            className="btn btn-primary"
          >
            Post Comment
          </button>

          {currentPost?.comments?.map(comment => (
            <div key={comment.id} className="comment">
              <p>{comment.content}</p>
              <small className="text-light">
                By {comment.author} • {new Date(comment.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      </div>
  );
};