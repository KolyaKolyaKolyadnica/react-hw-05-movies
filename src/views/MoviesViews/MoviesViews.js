import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './MoviesViews.module.css';

import ThemoviedbApi from '../../services/ThemoviedbApi';
const api = new ThemoviedbApi({});

function MoviesViews() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);

  const findMovies = e => {
    e.preventDefault();

    api
      .fetchMovieByQuery(query)
      .then(dataMovies => setMovies(dataMovies.results));
  };

  return (
    <>
      <div className={style.container}>
        <form onSubmit={findMovies}>
          <input
            type="text"
            onChange={e => setQuery(e.currentTarget.value)}
            placeholder="Enter your query..."
            value={query}
            required
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {movies && (
        <ul className={style.list}>
          {movies.map(movie => {
            return (
              <li key={movie.id} className={style.listItem}>
                <Link to={`/movies/${movie.id}`}>
                  {movie.original_title ? movie.original_title : movie.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default MoviesViews;
