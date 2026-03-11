import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useMovieStore } from '../store/movieStore';
import { movieAPI } from '../services/api';
import MovieCard from '../components/MovieCard';

export default function CategoryResults() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get('name') || 'Categoría';

  const {
    movies,
    setMovies,
    setLoading,
    loading,
  } = useMovieStore();

  useEffect(() => {
    const fetchCategoryMovies = async () => {
      setLoading(true);
      try {
        const results = await movieAPI.getMoviesByGenre(id);
        setMovies(results);
      } catch (error) {
        console.error('Error fetching category movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryMovies();
  }, [id, setMovies, setLoading]);

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 break-words">
            {decodeURIComponent(categoryName)}
          </h1>
          <div className="h-1 w-16 sm:w-20 bg-red-500 rounded"></div>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 sm:mt-4">
            {movies.length} película(s)
          </p>
        </div>

        {/* Movies Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] bg-neutral-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6 pb-12">
            {movies.map((movie) => (
              <div key={movie.id}>
                <MovieCard movie={movie} size="small" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-4">
            <p className="text-base sm:text-lg md:text-xl text-neutral-400">
              No hay películas disponibles en esta categoría
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
