import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="header container">
      <Link to="/" className="logo">
        <h2>Blog Platform</h2>
      </Link>
      
      <div className="nav-links">
        <Link to="/create-post" className="btn btn-primary">
          Create Post
        </Link>
      </div>
    </nav>
  );
};