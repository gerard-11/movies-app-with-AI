import { create } from 'zustand';

export const useMovieStore = create((set) => ({
  // State
  movies: [],
  trendingMovies: [],
  
  searchResults: [],
  movieDetail: null,
  genres: [],
  relatedMovies: [],
  loading: false,
  error: null,

  // Actions
  setMovies: (movies) => set({ movies }),
  setTrendingMovies: (movies) => set({ trendingMovies: movies }),
  setSearchResults: (results) => set({ searchResults: results }),
  setMovieDetail: (movie) => set({ movieDetail: movie }),
  setGenres: (genres) => set({ genres }),
  setRelatedMovies: (movies) => set({ relatedMovies: movies }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Clear state
  clearSearchResults: () => set({ searchResults: [] }),
  clearMovieDetail: () => set({ movieDetail: null }),
}));
