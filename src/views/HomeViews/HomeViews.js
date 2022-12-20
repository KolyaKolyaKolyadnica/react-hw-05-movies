import { Link, useLocation } from 'react-router-dom';
import style from './HomeViews.module.css';

function HomeViews({ trendsMovies }) {
  const { pathname } = useLocation();

  return (
    <div className={style.container}>
      <h1 className={style.title}>Tranding today</h1>
      <ul className={style.list}>
        {trendsMovies.map(trendMovie => {
          return (
            <li key={trendMovie.id} className={style.listItem}>
              <Link to={`/movies/${trendMovie.id}`} state={pathname}>
                {trendMovie.name ? trendMovie.name : trendMovie.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HomeViews;
