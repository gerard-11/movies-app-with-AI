import { useEffect } from 'react';
import { useMovieStore } from '../store/movieStore';
import { movieAPI } from '../services/api';
import MovieCard from '../components/MovieCard';

export default function TrendingMovies() {
  const {
    trendingMovies,
    setTrendingMovies,
    setLoading,
    loading,
  } = useMovieStore();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true);
      try {
        const results = await movieAPI.getTrending();
        setTrendingMovies(results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, [setTrendingMovies, setLoading]);

  return (
    <div className="min-h-screen bg-black px-4 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
            Tendencias Ahora 🔥
          </h1>
          <div className="h-1 w-16 sm:w-20 bg-red-500 rounded"></div>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 sm:mt-4">
            {trendingMovies.length} película(s)
          </p>
        </div>

        {/* Movies Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] bg-neutral-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : trendingMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6 pb-12">
            {trendingMovies.map((movie) => (
              <div key={movie.id}>
                <MovieCard movie={movie} size="small" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-4">
            <p className="text-base sm:text-lg md:text-xl text-neutral-400">
              No hay películas en tendencias
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
