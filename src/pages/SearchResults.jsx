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
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Resultados para: <span className="text-red-500">"{query}"</span>
          </h1>
          <div className="h-1 w-20 bg-red-500 rounded"></div>
          <p className="text-neutral-400 mt-4">
            Se encontraron {searchResults.length} película(s)
          </p>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-video bg-neutral-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((movie) => (
              <div key={movie.id}>
                <MovieCard movie={movie} size="medium" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-neutral-400 mb-4">
              No se encontraron resultados para "{query}"
            </p>
            <p className="text-neutral-500">
              Intenta con otra búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
