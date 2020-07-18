import React, { useMemo, useReducer } from 'react';
import './App.css';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import PageNotFound from './components/page-not-found';
import Authorization from './components/authorization';
import Watchlist from './components/watchlist/watchlist';
import Search from './components/search/search';
import './styles.scss';
import Movie from './components/movie/movie';
import Header from './components/header/header';
import Trailer from './components/trailer/trailer';
import {appReducer, initialAppState} from './reducers/app-reducer';

export const AppContext = React.createContext(null);

function App() {
  const [appState, appDispatch] = useReducer(appReducer, initialAppState);

  const appContextValue = useMemo(() => ({ appState, appDispatch }), [appState]);

  return (
    <AppContext.Provider value={appContextValue}>
      <div className="App">
        <Router basename='/'>
          <Header />
          <Authorization>
            <Switch>
              <Route path="/watchlist" component={Watchlist} />
              <Route path="/search" component={Search} />
              <Route path="/movie" component={Movie} />
              <Route path="/trailer" component={Trailer} />

              <Redirect exact from="/" to="/watchlist" />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Authorization>
        </Router>
      </div>
    </AppContext.Provider>
  );

}

export default App;
