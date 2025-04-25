import { Routes, Route } from 'react-router-dom';
import { PostList } from './components/PostList';
import { PostDetail } from './components/PostDetail';
import { CreatePost } from './components/CreatePost';
import { Navbar } from './components/Navbar';
import './App.scss';
import { EditPost } from './components/EditPost';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts/:id/edit" element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;