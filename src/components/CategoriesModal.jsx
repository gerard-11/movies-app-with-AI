import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovieStore } from '../store/movieStore';
import { movieAPI } from '../services/api';

export default function CategoriesModal({ isOpen, onClose }) {
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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[998]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 top-16 bg-neutral-900 overflow-y-auto z-[999]">
        {/* Header */}
        <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 px-4 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Categorías</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition text-xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {genres.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleCategoryClick(genre.id, genre.name)}
                  className="px-3 py-3 text-sm bg-neutral-800 hover:bg-red-500 text-neutral-300 hover:text-white rounded transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30 w-full text-center"
                >
                  {genre.name}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-neutral-400 text-center py-8">Cargando categorías...</p>
          )}
        </div>
      </div>
    </>
  );
}
