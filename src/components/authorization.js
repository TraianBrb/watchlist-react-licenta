import React, { useContext } from 'react';
import firebase from 'firebase';
import Login from './login/login';
import { AppContext } from '../App';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID
};
firebase.initializeApp(config);

const Authorization = ({children}) => {
  const { appState } = useContext(AppContext);
  
  console.log('appState: ', appState);
  return !!appState.user ? children : <Login />;
}

export default Authorization;