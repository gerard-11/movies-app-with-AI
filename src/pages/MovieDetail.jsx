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
    <div className="min-h-screen bg-black">
      {/* Backdrop */}
      {backdropUrl && (
        <div className="relative h-96 overflow-hidden">
          <img
            src={backdropUrl}
            alt={movieDetail.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          {posterUrl && (
            <div className="flex-shrink-0 w-full md:w-64">
              <img
                src={posterUrl}
                alt={movieDetail.title}
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          )}

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {movieDetail.title}
            </h1>
            <p className="text-neutral-400 mb-4">{movieDetail.release_date}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-amber-500 text-2xl">⭐</span>
              <span className="text-2xl font-bold text-white">
                {movieDetail.vote_average?.toFixed(1)}
              </span>
              <span className="text-neutral-400">/ 10</span>
            </div>

            {/* Genres */}
            {movieDetail.genres && movieDetail.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movieDetail.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Sinopsis</h2>
              <p className="text-neutral-300 leading-relaxed text-lg">
                {movieDetail.overview}
              </p>
            </div>

            {/* Runtime & Budget */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {movieDetail.runtime && (
                <div>
                  <p className="text-neutral-400 text-sm">Duración</p>
                  <p className="text-white font-semibold">
                    {movieDetail.runtime} minutos
                  </p>
                </div>
              )}
              {movieDetail.budget > 0 && (
                <div>
                  <p className="text-neutral-400 text-sm">Presupuesto</p>
                  <p className="text-white font-semibold">
                    ${(movieDetail.budget / 1000000).toFixed(0)}M
                  </p>
                </div>
              )}
            </div>

            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition font-semibold"
            >
              ← Volver
            </button>
          </div>
        </div>

        {/* Related Movies */}
        {relatedMovies.length > 0 && (
          <section className="mt-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Películas Similares
              </h2>
              <div className="h-1 w-20 bg-red-500 rounded"></div>
            </div>

            <div className="flex overflow-x-auto gap-4 pb-4">
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
