import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import useDebounce from './use-debounce';
import './search.scss';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [myMovies, setMyMovies] = useState();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const baseUrl = 'https://api.themoviedb.org/3';
  const method = '/search/multi';
  const apiKey = process.env.REACT_APP_MOVIE_DB_KEY;
  const adult = 'false';
  const fetchSearchResults = () => {
    const searchUrl = `${baseUrl}${method}?api_key=${apiKey}&query=${searchTerm}&include_adult=${adult}`;
    axios
      .get(searchUrl)
      .then((res) => {
        console.log(res.data.reuslts);
        setIsSearching(false);
        setResults(res.data.results);
      })
      .catch((error) => {
        console.log(error);
        setResults([]);
      });
  };

  const saveToWatchlist = (movie) => {
    console.log(movie);
    const user = JSON.parse(localStorage.getItem('user'));
    firebase.database().ref(`users/${user.uid}/${movie.id}`).set(movie);
  };

  const removeFromWatchlist = (movie) => {
    const user = JSON.parse(localStorage.getItem('user'));
    firebase.database().ref(`users/${user.uid}/${movie.id}`).remove();
  }

  const movieSaved = (movieId) => myMovies && myMovies.includes(movieId.toString());

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const db = firebase.database().ref(`users/${user.uid}`);
    db.on('value', (snapshot) => {
      if (snapshot && snapshot.val()) {
        console.log(snapshot.val());
        setMyMovies(Object.keys(snapshot.val()));
      }
    });
  }, []);
 
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      fetchSearchResults();
    } else {
      setResults([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <div className="body-container">
      <div className="container-search-form">
        <div className="search-form">
          <input type="text" id="search-value" name="search" autoComplete="off" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
          <div id="erase-input" onClick={() => setSearchTerm('')}>
            <img src="/images/close-icon.svg" alt="delete" />
          </div>

        </div>
        <a href="/" className="cancel-button">Cancel</a>

      </div>

      <div id="search-results">
        {isSearching && <div>Searching ...</div>}

        {!isSearching && !results.length &&
          <div className="search-results-placeholder">
            Are you <span className="bold">READY, PLAYER ONE</span> (2018)? 
            Because <span className="bold">WHAT WE STARTED</span> (2018), <span className="bold">I CAN ONLY IMAGINE</span> (2018) will <span className="bold">ALLURE</span> (2018) <span className="bold">JOSIE</span> (2018).
            <br/>
            <br/>
            <span className="bold">LOVE, SIMON</span> (2018).
          </div>
        }

        {!isSearching && results.map(result => (
          <div className="result-item" key={`movie-${result.id}`}>
            <a className="result-link" href={`/movie?id=${result.id}&type=${result.media_type}`}>
              {result.poster_path ? <img src={"http://image.tmdb.org/t/p/w185" + result.poster_path} alt="poster"></img> : ''}
              <div className="container-title-year">
                <p className="result-title">{ result.title || result.original_title || result.original_name }</p>
                <p className="result-year">{ result.release_date }</p>
              </div>
            </a>
            {!movieSaved(result.id) && <div className="add-to-watchlist" onClick={() => saveToWatchlist(result)}>
              <img src="/images/plus.svg" alt="add" />
            </div>}
            {movieSaved(result.id) && <div className="add-to-watchlist" onClick={() => removeFromWatchlist(result)}>
              <img src="/images/tick.svg" alt="add" />
            </div>}
          </div>  
        ))}
      </div>
    </div>
  );
}

export default Search;