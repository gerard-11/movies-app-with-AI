import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMovieStore } from '../store/movieStore';
import { movieAPI } from '../services/api';
import MovieCard from '../components/MovieCard';

export default function SearchResults() {
  const { query } = useParams();
  const {
    searchResults,
    setSearchResults,
    setLoading,
    loading,
  } = useMovieStore();

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const results = await movieAPI.searchMovies(query);
        setSearchResults(results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, setSearchResults, setLoading]);

  return (
    <div className="min-h-screen bg-black px-4 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 break-words">
            Resultados para: <span className="text-red-500 line-clamp-2">"{query}"</span>
          </h1>
          <div className="h-1 w-16 sm:w-20 bg-red-500 rounded"></div>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 sm:mt-4">
            Se encontraron {searchResults.length} película(s)
          </p>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] bg-neutral-800 rounded-sm animate-pulse"
              />
            ))}
          </div>
        ) : searchResults.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 pb-12">
            {searchResults.map((movie) => (
              <div key={movie.id}>
                <MovieCard movie={movie} size="small" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-base sm:text-lg md:text-xl text-neutral-400 mb-3 sm:mb-4 px-4">
              No se encontraron resultados para "{query}"
            </p>
            <p className="text-sm sm:text-base text-neutral-500 px-4">
              Intenta con otra búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
