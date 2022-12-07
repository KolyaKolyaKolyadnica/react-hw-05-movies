import { useState, useEffect } from 'react';
import ThemoviedbApi from 'services/ThemoviedbApi';
const api = new ThemoviedbApi({});

function CastViews() {
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .fetchCastById(436270)
      .then(dataCast => setCast(dataCast))
      .catch(err => setError(err));
  }, []);

  return <>aaaaaaaaaaaaaaaaaa</>;
}

export default CastViews;
