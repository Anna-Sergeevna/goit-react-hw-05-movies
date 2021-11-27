import { useState, useEffect } from 'react';
import * as fetchMovieAPI from '../../services/movieApi';
import Gallery from 'components/Gallery/Gallery';

import s from './HomePage.module.css';

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovieAPI.fetchPopular().then(data => setMovies(data.results));
  }, []);

  return (
    <div>
      <h2 className={s.title}>Trending today</h2>

      {movies && <Gallery movies={movies} />}
    </div>
  );
}

export default HomePage;
