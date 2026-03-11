import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovieStore } from '../store/movieStore';
import { movieAPI } from '../services/api';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const setSearchResults = useMovieStore((state) => state.setSearchResults);
  const setLoading = useMovieStore((state) => state.setLoading);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const results = await movieAPI.searchMovies(searchQuery);
      setSearchResults(results);
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/95 backdrop-blur border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex-shrink-0 focus:outline-none w-full sm:w-auto"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-500 hover:text-red-400 transition text-center sm:text-left">
              🎬 CineApp
            </h1>
          </button>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="w-full sm:flex-1 sm:max-w-md">
            <div className="flex items-center bg-neutral-900 rounded-full px-3 sm:px-4 py-2 border border-brand-border focus-within:border-red-500 transition">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white text-sm sm:text-base outline-none placeholder-neutral-500"
              />
              <button
                type="submit"
                className="ml-2 text-red-500 hover:text-red-400 transition text-lg sm:text-xl"
              >
                🔍
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}
