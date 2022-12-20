import { useState, useEffect } from 'react';
import {
  useParams,
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import style from './MovieViews.module.css';

import ThemoviedbApi from '../../services/ThemoviedbApi';
const api = new ThemoviedbApi({});

function MovieViews() {
  const [currentMovie, setCurrentMovie] = useState(null);
  const [error, setError] = useState(null);

  const { movieId } = useParams();
  const location = useLocation();
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

          {/* My approach (good/bad?) */}
          <Link to={location.state}>
            <button>
              {location.state ? 'Go Back (Link)' : 'It`s your first page'}
            </button>
          </Link>

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
                  state={location.state}
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
                  state={location.state}
                  className={({ isActive }) =>
                    isActive ? style.activeLink : style.link
                  }
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
