import { useNavigate } from 'react-router-dom';

export default function CategoryCard({ genre }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${genre.id}?name=${encodeURIComponent(genre.name)}`);
  };

  return (
    <button
      onClick={handleClick}
      className="relative overflow-hidden rounded-lg bg-gradient-to-br from-red-600 to-red-800 p-2 sm:p-4 md:p-5 text-white font-semibold text-xs sm:text-sm md:text-base hover:shadow-2xl hover:shadow-red-500/50 hover:scale-105 transition-all duration-300 min-h-16 sm:min-h-20 md:min-h-28 flex items-center justify-center text-center w-full"
    >
      <span className="relative z-10 line-clamp-3">{genre.name}</span>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
    </button>
  );
}
