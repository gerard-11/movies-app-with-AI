import { useNavigate } from 'react-router-dom';

export default function MovieCard({ movie, size = 'medium' }) {
  const navigate = useNavigate();
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  const sizeClasses = {
    small: 'w-32 h-48',
    medium: 'w-40 h-56',
    large: 'w-48 h-64',
  };

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className={`${sizeClasses[size]} flex-shrink-0 cursor-pointer group relative overflow-hidden rounded-lg`}
    >
      {/* Image */}
      <img
        src={imageUrl}
        alt={movie.title || movie.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
        <div className="text-white">
          <p className="text-sm font-semibold line-clamp-2">{movie.title || movie.name}</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-amber-500">⭐</span>
            <span className="text-xs text-neutral-300">{movie.vote_average?.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Rating Badge */}
      <div className="absolute top-2 right-2 bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded">
        {movie.vote_average?.toFixed(1) || 'N/A'}
      </div>
    </div>
  );
}
