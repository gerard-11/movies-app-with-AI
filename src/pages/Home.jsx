import { useEffect } from 'react';
import { useMovieStore } from '../store/movieStore';
import { movieAPI } from '../services/api';
import MovieCard from '../components/MovieCard';
import CategoryCard from '../components/CategoryCard';

export default function Home() {
  const {
    trendingMovies,
    genres,
    setTrendingMovies,
    setGenres,
    setLoading,
  } = useMovieStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [trending, genresList] = await Promise.all([
          movieAPI.getTrending(),
          movieAPI.getGenres(),
        ]);
        setTrendingMovies(trending);
        setGenres(genresList);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setTrendingMovies, setGenres, setLoading]);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-64 sm:h-80 md:h-96 bg-gradient-brand overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4">
              Bienvenido a <span className="text-red-500">CineApp</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-300">
              Descubre miles de películas
            </p>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Tendencias Ahora 🔥
          </h2>
          <div className="h-1 w-16 sm:w-20 bg-red-500 rounded"></div>
        </div>

        {trendingMovies.length > 0 ? (
          <div className="flex overflow-x-auto gap-2 sm:gap-3 md:gap-4 pb-4 scrollbar-hide">
            {trendingMovies.slice(0, 10).map((movie) => (
              <MovieCard key={movie.id} movie={movie} size="medium" />
            ))}
          </div>
        ) : (
          <div className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-32 h-48 sm:w-40 sm:h-56 md:w-44 md:h-60 lg:w-48 lg:h-64 bg-neutral-800 rounded-lg animate-pulse flex-shrink-0"
              />
            ))}
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 pb-16">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Categorías 📚
          </h2>
          <div className="h-1 w-16 sm:w-20 bg-red-500 rounded"></div>
        </div>

        {genres.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {genres.map((genre) => (
              <CategoryCard key={genre.id} genre={genre} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-24 sm:h-28 md:h-32 bg-neutral-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
