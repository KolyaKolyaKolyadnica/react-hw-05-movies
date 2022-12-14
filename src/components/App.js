import { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

import Navigation from './Navigation/Navigation';
import HomeViews from '../views/HomeViews/HomeViews';
import MoviesViews from '../views/MoviesViews/MoviesViews';
import MovieViews from '../views/MovieViews/MovieViews';
import CastViews from '../views/CastViews/CastViews';
import ReviewsViews from '../views/ReviewsViews/ReviewsViews';

import ThemoviedbApi from 'services/ThemoviedbApi';
const api = new ThemoviedbApi({});

export const App = () => {
  const [trendMovies, setTrendMovies] = useState([]);

  useEffect(() => {
    api.fetchTrend().then(newTrends => setTrendMovies(newTrends.results));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<HomeViews trendsMovies={trendMovies} />} />
        {/* <Route
          path="react-hw-05-movies"
          element={<HomeViews trendsMovies={trendMovies} />}
        /> */}
        <Route path="movies" element={<MoviesViews />} />
        <Route path="movies/:movieId" element={<MovieViews />}>
          <Route path="cast" element={<CastViews />} />
          <Route path="reviews" element={<ReviewsViews />} />
        </Route>
      </Route>
    </Routes>
  );
};
