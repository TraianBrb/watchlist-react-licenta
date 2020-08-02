import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import './watchlist.scss';
import { useContext } from 'react';
import { AppContext } from '../../App';
import { IS_LOADING } from '../../reducers/app-reducer';

const Watchlist = ({history}) => {
  const [ movies, setMovies ] = useState();
  const { appState, appDispatch } = useContext(AppContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const db = firebase.database().ref(`users/${user.uid}`);
    appDispatch({isLoading: true, type: IS_LOADING});
    db.on('value', (snapshot) => {
      if (snapshot && snapshot.val()) {
        console.log(snapshot.val());
        setMovies(snapshot.val());
      } else {
        window.location.href = '/search';
      }
      appDispatch({isLoading: false, type: IS_LOADING});
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="body-container">
      <header>
        <h1 className="homepage-title">My Watchlist</h1>
      </header>

      <main>
        {appState.isLoading && 
          <p>Loading...</p>
        }
        {!appState.isLoading &&
          <ul className="movie-list">
            {movies && Object.keys(movies).map(movieId => (
              <li className="movie" key={movies[movieId].id}>
                <a href={`/movie?id=${movieId}&type=${movies[movieId].media_type}`}>
                  {movies[movieId].poster_path ? <img src={`http://image.tmdb.org/t/p/w185${movies[movieId].poster_path}`} alt="poster" /> : movies[movieId].title}
                </a>
              </li>
            ))}

            {!movies && <p className="no-movie">You didn't save any movie yet. Click on the search movie button.</p>}

            <li className="movie add-new-movie">
              <a href={'/search'}>
                <div className="add-new-movie__icon"></div>
                Search movie
              </a>
            </li>
          </ul>
        }
      </main>
    </div>
  );
}

export default Watchlist;