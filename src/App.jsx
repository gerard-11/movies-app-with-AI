import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoriesModal from './components/CategoriesModal';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import SearchResults from './pages/SearchResults';
import CategoryResults from './pages/CategoryResults';
import TrendingMovies from './pages/TrendingMovies';
import './index.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black">
        <Header onOpenCategoriesModal={() => setIsModalOpen(true)} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/category/:id" element={<CategoryResults />} />
            <Route path="/trending" element={<TrendingMovies />} />
          </Routes>
        </main>
        <Footer />
        <CategoriesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
