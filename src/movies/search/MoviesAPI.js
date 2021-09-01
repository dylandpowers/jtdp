/**
 * @fileoverview A service to contact the movies API.
 */
import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3/search/movie';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w92';

/**
 * Search movies based on the given query. 
 * 
 * @param {string} query
 * @param {function} onSuccess
 * @param {function} onFailure
 */
export function searchMovies(query, onSuccess, onFailure) {
  const url = `${API_URL}?query=${query}&api_key=92e2dd5d5c15b8e895ccbb731bb8a7ab`;

  axios.get(url)
    .then((response) => {
      const movies = response.data.results.map((movie) => ({
        title: movie.original_title,
        description: movie.overview,
        avatarUrl: `${IMAGE_URL}/${movie.poster_path}`,
        id: movie.id,
      }));
      onSuccess(movies);
    })
    .catch((err) => {
      onFailure();
    })
}