import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";
import { postActions, postStore } from "../store/store";

export const PostList = () => {
  const { 
    posts, 
    loading, 
    error, 
    searchQuery,
    currentPage,
    itemsPerPage,
    totalPosts,
    sortBy
  } = useSnapshot(postStore);

  const totalPages = Math.ceil(totalPosts / itemsPerPage);

  useEffect(() => {
    postActions.fetchPosts();
  }, [currentPage, itemsPerPage, searchQuery, sortBy]);

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    postActions.setSearchQuery(e.target.value);
    postActions.setCurrentPage(1);
  };

  return (
    <div className="container">
      <div className="header">

        <h1>Latest Posts</h1>

        <div className="controls">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />

          <select
            value={itemsPerPage}
            onChange={(e) => postActions.setItemsPerPage(Number(e.target.value))}
            className="page-select"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>

          <select
            value={sortBy}
            disabled={loading}
            onChange={(e) => postActions.setSortBy(e.target.value as 'newest' | 'comments')}
            className="sort-select"
          >
            <option value="newest">Newest First</option>
            <option value="comments">Most Comments</option>
          </select>
        </div>
      </div>

      <div className="posts-grid">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">

              <h2 className="post-title">{post.title}</h2>

              <div className="post-meta">
                <span className="meta-item">
                  <svg className="icon" viewBox="0 0 24 24">
                    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm1 3v5h4v2h-6V7h2z"/>
                  </svg>
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                
                <span className="meta-item">
                  <svg className="icon" viewBox="0 0 24 24">
                    <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm8.5-5v2h3V7h-3zm0 4v6h3v-6h-3z"/>
                  </svg>
                  {post.comments?.length || 0} comments
                </span>
              </div>
            </div>
            
            <div className="post-preview">
              {post.content.substring(0, 200)}...
              <div className="preview-fade"></div>
            </div>

            <div className="post-actions">
              <Link to={`/posts/${post.id}`} className="btn btn-primary btn-icon">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => postActions.setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        <span>Page {currentPage} of {totalPages}</span>
        
        <button
          onClick={() => postActions.setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};