import React, { useState, useContext } from 'react';
import firebase from 'firebase'
import { withRouter } from 'react-router-dom'
import './login.scss';
import { AppContext } from '../../App';
import { SET_USER } from '../../reducers/app-reducer';

const Login = ({history}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState('');
  const { appDispatch } = useContext(AppContext);

  const handleForm = type => {
    if (type === 'login') {
      firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(res => {
            if (res.user) {
              appDispatch({user: res.user, type: SET_USER});
              history.push('/watchlist');
            } else {
              console.log('login response without user');
            }
          })
          .catch(e => {
            setErrors(e.message);
          });
        })
    } else if (type === 'register') {
      firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(res => {
            if (res.user) {
              appDispatch({user: res.user, type: SET_USER});
              history.push('/watchlist');
            } else {
              console.log('register response without user');
            }
          })
          .catch(e => {
            setErrors(e.message);
          });
        })
    }
  
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => { 
      firebase
      .auth()
      .signInWithPopup(provider)
      .then(res => {
        appDispatch({user: res.user, type: SET_USER});
        history.push('/watchlist');
      })
      .catch(e => setErrors(e.message));
    })
   
  }
  return (
    <div className='login-container'>
      <div className='login-form'>
        <div className='form__group field'>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type='email' 
            className='form__field' 
            placeholder='Email' 
            name='email' 
            id='email' 
            required 
          />
          <label htmlFor='email' className='form__label'>Email</label>
        </div>
        <div className='form__group field'>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password' 
            className='form__field' 
            placeholder='Password' 
            name='password' 
            id='password' 
            required 
          />
          <label htmlFor='password' className='form__label'>Password</label>
        </div>
        <div className="buttons-container">
          <button className='button button--login' onClick={() => handleForm('login')}>Login</button>
          <button className='button button--register' onClick={() => handleForm('register')}>Register</button>
        </div>
        
        <span>{error}</span>

        <hr className='separator' />
        <div className='social-media-login'>
          <button className='social-button' id='google-connect' onClick={() => signInWithGoogle()} type='button'>
            <span>Connect with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);