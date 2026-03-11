import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovieStore } from '../store/movieStore';
import { movieAPI } from '../services/api';

export default function CategoriesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { genres, setGenres } = useMovieStore();

  useEffect(() => {
    if (genres.length === 0) {
      const fetchGenres = async () => {
        try {
          const genresList = await movieAPI.getGenres();
          setGenres(genresList);
        } catch (error) {
          console.error('Error fetching genres:', error);
        }
      };
      fetchGenres();
    }
  }, [genres.length, setGenres]);

  const handleCategoryClick = (genreId, genreName) => {
    navigate(`/category/${genreId}?name=${encodeURIComponent(genreName)}`);
    setIsOpen(false);
  };

  return (
    <div className="relative group">
      {/* Trigger Link */}
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="text-neutral-300 hover:text-red-500 transition font-medium text-sm sm:text-base"
      >
        Categorías
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="absolute top-full left-0 mt-2 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl p-3 sm:p-4 min-w-max max-w-xs sm:max-w-sm z-50"
        >
          {genres.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleCategoryClick(genre.id, genre.name)}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-neutral-800 hover:bg-red-500 text-neutral-300 hover:text-white rounded transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30"
                >
                  {genre.name}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-neutral-400 text-xs sm:text-sm">Cargando categorías...</p>
          )}
        </div>
      )}
    </div>
  );
}
