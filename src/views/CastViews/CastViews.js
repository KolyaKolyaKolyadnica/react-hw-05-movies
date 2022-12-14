import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CastListItem from 'components/CastListItem';
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

  const listItems =
    cast &&
    cast.map(cast => {
      return <CastListItem key={cast.id} cast={cast} />;
    });

  return (
    <>
      {cast?.length > 0 ? (
        <div className={style.container}>
          <ul className={style.list}>{listItems}</ul>
        </div>
      ) : (
        <p>Unfortunately, there is no cast.</p>
      )}

      {error && <div>ERROR! {error.message}</div>}
    </>
  );
}

export default CastViews;
