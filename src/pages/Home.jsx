import { useEffect } from 'react';
import {TextArea} from "../components/TextArea.jsx";
import { useMovieStore } from '../store/movieStore';
import { movieAPI } from '../services/api';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const {
    trendingMovies,
    setTrendingMovies,
    setLoading,
  } = useMovieStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const trending = await movieAPI.getTrending();
        setTrendingMovies(trending);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setTrendingMovies, setLoading]);

  return (
    <div className="min-h-screen bg-black px-4 sm:px-4 md:px-6 lg:px-8">
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

<TextArea/>

      <section className="max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12">
        <div className=" sm:mb-8 mb-8">
          <h2 className="text-2xl  sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Tendencias Ahora 🔥
          </h2>
          <div className="h-1 w-16 sm:w-20 bg-red-500 rounded"></div>
        </div>

        {trendingMovies.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 pb-12">
            {trendingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} size="small" />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] bg-neutral-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
