/**
 * @fileoverview A custom hook to search for movies.
 */
import { useState, useEffect } from 'react';
import { searchMovies } from './MoviesAPI';

export default function useMovieSearch(query) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query === '') {
      setMovies([]);
      return;
    }

    const onFailure = () => {
      console.error('There was an issue fetching movies.');
    };

    searchMovies(query, setMovies, onFailure);
  }, [query]);

  return {
    movies
  };
}