import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Endpoints
export const movieAPI = {
  // Get trending movies
  getTrending: async () => {
    try {
      const { data } = await api.get('/trending');
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch trending movies: ${error.message}`);
    }
  },

  // Search movies
  searchMovies: async (query) => {
    try {
      const { data } = await api.get(`/search?query=${encodeURIComponent(query)}`);
      return data;
    } catch (error) {
      throw new Error(`Failed to search movies: ${error.message}`);
    }
  },

  // Get genres
  getGenres: async () => {
    try {
      const { data } = await api.get('/genres');
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch genres: ${error.message}`);
    }
  },

  // Get movies by genre/category
  getMoviesByGenre: async (genreId) => {
    try {
      const { data } = await api.get(`/discover?genre_id=${genreId}`);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch movies by genre: ${error.message}`);
    }
  },

  // Get movie detail
  getMovieDetail: async (movieId) => {
    try {
      const { data } = await api.get(`/movie/${movieId}`);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch movie detail: ${error.message}`);
    }
  },

  // Get similar movies
  getSimilarMovies: async (movieId) => {
    try {
      const { data } = await api.get(`/movie/${movieId}/similar`);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch similar movies: ${error.message}`);
    }
  },
};

export default api;
