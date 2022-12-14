import { useState, useEffect } from 'react';
import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom';
import style from './MovieViews.module.css';

import ThemoviedbApi from '../../services/ThemoviedbApi';
const api = new ThemoviedbApi({});

function MovieViews() {
  const [currentMovie, setCurrentMovie] = useState(null);
  const [error, setError] = useState(null);

  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .fetchMovieById(movieId)
      .then(movie => setCurrentMovie(movie))
      .catch(err => setError(err));
  }, []);

  return (
    <>
      {currentMovie && (
        <div className={style.container}>
          {/* Bad approach? */}
          <button onClick={() => window.history.back()}>
            Go Back (window.history)
          </button>
          {/* Good approach? */}
          <button onClick={() => navigate(-1)}>Go Back (useNavigate)</button>

          <div className={style.mainInfo}>
            <img
              src={`https://image.tmdb.org/t/p/original${currentMovie.poster_path}`}
              alt={currentMovie.name}
              className={style.movieImg}
            />

            <div className={style.infoText}>
              <h1>
                {currentMovie.name ? currentMovie.name : currentMovie.title}
              </h1>

              <p>Popularity: {currentMovie.popularity}</p>
              <p>Vote average: {currentMovie.vote_average}</p>

              <h3 className={style.subtitle}>Overview:</h3>
              <p className={style.overview}>{currentMovie.overview}</p>

              <h3 className={style.subtitle}>Genres:</h3>
              <ul className={style.genreList}>
                {currentMovie.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <hr />
          <div>
            <ul className={style.additionalInformationList}>
              <li className={style.additionalInformationItem}>
                <NavLink
                  to={`/movies/${movieId}/cast`}
                  test={movieId}
                  className={({ isActive }) =>
                    isActive ? style.activeLink : style.link
                  }
                >
                  Cast
                </NavLink>
              </li>
              <li className={style.additionalInformationItem}>
                <NavLink
                  to={`/movies/${movieId}/reviews`}
                  className={({ isActive }) =>
                    isActive ? style.activeLink : style.link
                  }
                  test={movieId}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
          <hr />

          <Outlet />
        </div>
      )}

      {error && <div className={style.container}>{error.message}</div>}
    </>
  );
}

export default MovieViews;

// {
// function MovieViews({ trendMovies, genresList }) {

//   const getGenreNameById = () => {
//     if (genresList.length === 0) {
//       return [];
//     }

//     const currentMovieGenreList = genresList.genres.filter(genre =>
//       currentMovie.genre_ids.includes(genre.id)
//     );

//     return currentMovieGenreList;
//   };

//   const itemListGenre = getGenreNameById().map(genre => (
//     <li key={genre.id}>{genre.name}</li>
//   ));

// }
