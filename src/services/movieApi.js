const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = 'c2855cd9e1605af870984c1963f9b27b';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchPopular() {
  return fetchWithErrorHandling(`${BASE_URL}trending/all/day?api_key=${KEY}`);
}

export function fetchSearchQuery() {
  return fetchWithErrorHandling(
    `${BASE_URL}search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false`,
  );
}

export function fetchCast() {
  return fetchWithErrorHandling(
    `${BASE_URL}movie/{movie_id}/credits?api_key=${KEY}&language=en-US`,
  );
}

export function fetchReviews() {
  return fetchWithErrorHandling(
    `${BASE_URL}movie/{movie_id}/reviews?api_key=${KEY}&language=en-US&page=1`,
  );
}
