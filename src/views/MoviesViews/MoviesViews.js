import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import style from './MoviesViews.module.css';

import ThemoviedbApi from '../../services/ThemoviedbApi';
const api = new ThemoviedbApi({});

function MoviesViews() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [movies, setMovies] = useState(null);

  const { pathname } = useLocation();

  const findMovies = e => {
    e.preventDefault();

    api
      .fetchMovieByQuery(query)
      .then(dataMovies => setMovies(dataMovies.results));
  };

  useEffect(() => {
    if (!query) return;

    api
      .fetchMovieByQuery(query)
      .then(dataMovies => setMovies(dataMovies.results));
  }, []);

  useEffect(() => {
    if (movies === null) return;

    setSearchParams({ query: query });
  }, [movies]);

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
                <Link
                  to={`${pathname}/${movie.id}`}
                  state={`${pathname}?query=${query}`}
                >
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
