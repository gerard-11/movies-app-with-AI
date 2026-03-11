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
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Tendencias Ahora 🔥
          </h1>
          <div className="h-1 w-20 bg-red-500 rounded"></div>
          <p className="text-neutral-400 mt-4">
            {trendingMovies.length} película(s)
          </p>
        </div>

        {/* Movies Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="aspect-video bg-neutral-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : trendingMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingMovies.map((movie) => (
              <div key={movie.id}>
                <MovieCard movie={movie} size="medium" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-neutral-400">
              No hay películas en tendencias
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
