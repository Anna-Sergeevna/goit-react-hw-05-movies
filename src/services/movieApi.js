import { URL } from './settings-url';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchPopular() {
  return fetchWithErrorHandling(
    `${URL.BASE_URL}trending/movie/day?api_key=${URL.KEY}`,
  );
}

export function fetchMovieById(movieId) {
  return fetchWithErrorHandling(
    `${URL.BASE_URL}movie/${movieId}?api_key=${URL.KEY}&language=en-US`,
  );
}

export function fetchSearchQuery(query) {
  return fetchWithErrorHandling(
    `${URL.BASE_URL}search/movie?api_key=${URL.KEY}&language=en-US&page=1&include_adult=false&query=${query}`,
  );
}

export function fetchCast(movieId) {
  return fetchWithErrorHandling(
    `${URL.BASE_URL}movie/${movieId}/credits?api_key=${URL.KEY}&language=en-US`,
  );
}

export function fetchReviews(movieId) {
  return fetchWithErrorHandling(
    `${URL.BASE_URL}movie/${movieId}/reviews?api_key=${URL.KEY}&language=en-US&page=1`,
  );
}
