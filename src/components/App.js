import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

import Navigation from './Navigation/Navigation';
// import HomeViews from '../views/HomeViews/HomeViews';
// import MoviesViews from '../views/MoviesViews/MoviesViews';
// import MovieViews from '../views/MovieViews/MovieViews';
// import CastViews from '../views/CastViews/CastViews';
// import ReviewsViews from '../views/ReviewsViews/ReviewsViews';

import ThemoviedbApi from 'services/ThemoviedbApi';
const api = new ThemoviedbApi({});

const HomeViews = lazy(
  () =>
    import('../views/HomeViews/HomeViews') /* webpackChunkName: "DASDAADS" */
);
const MoviesViews = lazy(() => import('../views/MoviesViews/MoviesViews'));
const MovieViews = lazy(() => import('../views/MovieViews/MovieViews'));
const CastViews = lazy(() => import('../views/CastViews/CastViews'));
const ReviewsViews = lazy(() => import('../views/ReviewsViews/ReviewsViews'));

export const App = () => {
  const [trendMovies, setTrendMovies] = useState([]);

  useEffect(() => {
    api.fetchTrend().then(newTrends => setTrendMovies(newTrends.results));
  }, []);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomeViews trendsMovies={trendMovies} />} />
          <Route path="movies" element={<MoviesViews />} />
          <Route path="movies/:movieId" element={<MovieViews />}>
            {/* <Suspense> */}
            <Route path="cast" element={<CastViews />} />
            <Route path="reviews" element={<ReviewsViews />} />
            {/* </Suspense> */}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};
