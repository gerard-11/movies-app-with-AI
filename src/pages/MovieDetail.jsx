import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovieStore } from '../store/movieStore';
import { movieAPI } from '../services/api';
import MovieCard from '../components/MovieCard';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    movieDetail,
    relatedMovies,
    setMovieDetail,
    setRelatedMovies,
    setLoading,
    loading,
  } = useMovieStore();

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        const [detail, similar] = await Promise.all([
          movieAPI.getMovieDetail(id),
          movieAPI.getSimilarMovies(id),
        ]);
        setMovieDetail(detail);
        setRelatedMovies(similar);
      } catch (error) {
        console.error('Error fetching movie detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id, setMovieDetail, setRelatedMovies, setLoading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!movieDetail) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg">Película no encontrada</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
          >
            Volver a inicio
          </button>
        </div>
      </div>
    );
  }

  const backdropUrl = movieDetail.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movieDetail.backdrop_path}`
    : null;

  const posterUrl = movieDetail.poster_path
    ? `https://image.tmdb.org/t/p/w300${movieDetail.poster_path}`
    : null;

  return (
    <div className="min-h-screen bg-black ">
      {/* Backdrop - Solo en md+ (no en móvil) */}
      {backdropUrl && (
        <div className="hidden md:block relative h-80 lg:h-96 overflow-hidden">
          <img
            src={backdropUrl}
            alt={movieDetail.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 md:-mt-32 relative z-10 pb-12">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
          {/* Poster */}
          {posterUrl && (
            <div className="flex-shrink-0 w-full sm:w-48 md:w-56 lg:w-64 mx-auto sm:mx-0">
              <img
                src={posterUrl}
                alt={movieDetail.title}
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          )}

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2 break-words">
              {movieDetail.title}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-neutral-400 mb-3 sm:mb-4 px-2">
              {movieDetail.release_date}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <span className="text-amber-500 text-lg sm:text-xl md:text-2xl">⭐</span>
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                {movieDetail.vote_average?.toFixed(1)}
              </span>
              <span className="text-xs sm:text-base text-neutral-400">/ 10</span>
            </div>

            {/* Genres */}
            {movieDetail.genres && movieDetail.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                {movieDetail.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-red-500/20 text-red-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-4">
                Sinopsis
              </h2>
              <p className="text-neutral-300 font-light leading-relaxed text-sm sm:text-base md:text-base">
                {movieDetail.overview}
              </p>
            </div>

            {/* Runtime & Budget */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {movieDetail.runtime && (
                <div>
                  <p className="text-neutral-400 text-xs sm:text-sm">Duración</p>
                  <p className="text-white text-sm sm:text-base font-semibold">
                    {movieDetail.runtime} min
                  </p>
                </div>
              )}
              {movieDetail.budget > 0 && (
                <div>
                  <p className="text-neutral-400 text-xs sm:text-sm">Presupuesto</p>
                  <p className="text-white text-sm sm:text-base font-semibold">
                    ${(movieDetail.budget / 1000000).toFixed(0)}M
                  </p>
                </div>
              )}
            </div>

            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition font-semibold text-sm sm:text-base"
            >
              ← Volver
            </button>
          </div>
        </div>

        {/* Related Movies */}
        {relatedMovies.length > 0 && (
          <section className="mt-12 sm:mt-16">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                Películas Similares
              </h2>
              <div className="h-1 w-16 sm:w-20 bg-red-500 rounded"></div>
            </div>

            <div className="flex overflow-x-auto gap-2 sm:gap-3 md:gap-4 pb-4">
              {relatedMovies.slice(0, 10).map((movie) => (
                <MovieCard key={movie.id} movie={movie} size="medium" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
