import style from './CastListItem.module.css';

export default function CastListItem({ cast }) {
  return (
    <li className={style.listItem}>
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
}
