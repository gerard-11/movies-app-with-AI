import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovieStore } from '../store/movieStore';
import { movieAPI } from '../services/api';

export default function CategoriesDropdown({ onOpenModal }) {
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

  const handleButtonClick = () => {
    if (window.innerWidth < 640) {
      onOpenModal();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative">
      {/* Trigger Link */}
      <button
        onClick={handleButtonClick}
        onMouseEnter={() {
          if (window.innerWidth >= 640) setIsOpen(true);
        }}
        onMouseLeave={() => {
          if (window.innerWidth >= 640) setIsOpen(false);
        }}
        className="text-neutral-300 cursor-pointer hover:text-red-500 transition font-medium text-sm sm:text-base"
      >
        Categorías
      </button>

      {/* Desktop Dropdown Only */}
      {isOpen && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="hidden sm:block absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl p-4 sm:p-6 w-[500px] md:w-[600px] lg:w-[700px] max-h-96 overflow-y-auto z-50"
        >
          {genres.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleCategoryClick(genre.id, genre.name)}
                  className="px-3 cursor-pointer sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm bg-neutral-800 hover:bg-red-500 text-neutral-300 hover:text-white rounded transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30 w-full text-center"
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
