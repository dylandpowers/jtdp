/**
 * @fileoverview A controller for actions related to movies.
 * @author Dylan Powers
 */
import _ from 'lodash';

/**
 * Given an array of undordered movies, orders the movies by ranking. 
 *
 * @param {!Array<!Object>} unordered 
 * @return {!Array<!Object>}
 */
export function orderMovies(unordered) {
  if (!unordered.length) {
    return [];
  }

  // First find the head
  const headCandidates = unordered.filter((m) => !m.prev);
  if (!headCandidates.length || headCandidates.length > 1) {
    throw new Error('Invalid list format.');
  }

  const ordered = [{ ...headCandidates[0], index: 0 }];
  const idToMovie = unordered.reduce((m1, m2) => ({ ...m1, [m2.id]: m2 }), {});

  let curr = ordered[0];
  while (curr.next) {
    ordered.push({ ...idToMovie[curr.next], index: ordered.length });
    curr = idToMovie[curr.next];
  }

  return ordered;
}

/**
 * Commits the reordering by inserting the movie at sourceIndex into destinationIndex.
 * 
 * @param {!Array<!Object>} movies 
 * @param {number} sourceIndex 
 * @param {number} destinationIndex 
 * @param {function(number):!Object} getMovie 
 * @param {!Object} batch 
 */
export function commitReorder(movies, sourceIndex, destinationIndex, getMovie, batch) {
  if (sourceIndex === destinationIndex) {
    return;
  }

  const newMovies = _.cloneDeep(movies);
  const sourceMovie = newMovies[sourceIndex];

  newMovies.splice(sourceIndex, 1);
  newMovies.splice(destinationIndex, 0, sourceMovie);

  let curr = newMovies[0];
  delete curr.prev;
  
  for (let i = 1; i < newMovies.length; i++) {
    newMovies[i].prev = curr.id;
    if (i === newMovies.length - 1) {
      delete newMovies[i].next;
    }
    curr.next = newMovies[i].id;
    curr = newMovies[i];
  }

  newMovies.forEach((movie) => {
    batch.set(getMovie(movie.id), normalize(movie));
  });
  
  batch.commit();
}

/**
 * Appends an unwatched movie to the end of the list.
 * 
 * @param {!Array<!Object>} orderedMovies the ordered list of movies
 * @param {!Object} newMovie the new movie to add
 * @param {function(number):!Object} getMovie 
 * @param {!Object} batch
 */
export function appendUnwatched(orderedMovies, newMovie, getMovie, batch) {
  if (!orderedMovies.length) {
    batch.set(getMovie(newMovie.id), normalize(newMovie));
    batch.commit();
    return;
  }

  const lastMovie = _.cloneDeep(orderedMovies[orderedMovies.length - 1]);
  lastMovie.next = newMovie.id;
  newMovie.prev = lastMovie.id;

  batch.set(getMovie(lastMovie.id), normalize(lastMovie));
  batch.set(getMovie(newMovie.id), normalize(newMovie));

  batch.commit();
}

/**
 * Normalizes the given movie by removing null values and setting the prev and next pointers to
 * numbers.
 *
 * @param {!Object} movie 
 * @return {!Object} the normalized movie
 */
function normalize(movie) {
  const newMovie = _.cloneDeep(movie);
  delete newMovie.id;
  delete newMovie.index;

  if (newMovie.prev) {
    newMovie.prev = Number(newMovie.prev);
  }
  if (newMovie.next) {
    newMovie.next = Number(newMovie.next);
  }

  return newMovie;
}