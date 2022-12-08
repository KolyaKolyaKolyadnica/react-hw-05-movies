import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import style from './CastViews.module.css';

import ThemoviedbApi from 'services/ThemoviedbApi';
const api = new ThemoviedbApi({});

function CastViews() {
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);

  const { movieId } = useParams();

  useEffect(() => {
    api
      .fetchCastById(movieId)
      .then(dataCast => setCast(dataCast.cast))
      .catch(err => setError(err));
  }, []);

  return (
    <>
      {cast && (
        <div className={style.container}>
          <ul className={style.list}>
            {cast.map(cast => {
              return (
                <li key={cast.id} className={style.listItem}>
                  <h3>{cast.name}</h3>

                  {cast.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                      className={style.actorFoto}
                      alt={`${cast.name}`}
                    />
                  ) : (
                    <img
                      src="https://w7.pngwing.com/pngs/998/203/png-transparent-black-and-white-no-to-camera-logo-video-on-demand-retail-website-simple-no-miscellaneous-television-text.png"
                      className={style.actorFoto}
                      alt={`Not found`}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {error && <div>ERROR! {error.message}</div>}
    </>
  );
}

export default CastViews;
