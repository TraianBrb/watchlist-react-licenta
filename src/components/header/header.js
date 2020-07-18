import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import firebase from 'firebase';
import { SET_USER } from '../../reducers/app-reducer';
import './header.scss';

const Header = () => {
  const signOut = () => {
    firebase.auth().signOut();
    appDispatch({user: undefined, type: SET_USER})
  };
  const { appState, appDispatch } = useContext(AppContext);

  const isOnWatchlist = window.location.pathname === '/watchlist';

  console.log('appState: ', appState);
  console.log('isOnWatchslit: ', isOnWatchlist);
  return (
    <ul className='nav'>
      {!!appState.user && !isOnWatchlist && <li className="nav-button nav-button--watchlist"><span onClick={() => window.location.href = '/watchlist'}>My Watchlist</span></li>}
      {!!appState.user && <li className="nav-button nav-button--log-out"><span onClick={signOut}>Log Out</span></li>}
    </ul>
  )
}


export default Header;