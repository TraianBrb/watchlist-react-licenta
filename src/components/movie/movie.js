import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, BrowserRouter as Router } from 'react-router-dom';
import './movie.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Movie = () => {
  let query = useQuery();
  const [movieDetails, setDetails] = useState({});
  const [movieTrailers, setTrailers] = useState([]);
  const [movieCredits, setCredits] = useState([]);
  const [movieRecommendations, setRecommendations] = useState([]);

  const movieId = query.get('id');
  const mediaType = query.get('type');
  const baseUrl = `https://api.themoviedb.org/3/${mediaType}/`;
  const apiKey = process.env.REACT_APP_MOVIE_DB_KEY;

  const fetchMovie = () => {
    const detailsApi = `${baseUrl}${movieId}?api_key=${apiKey}`;
    const videosApi = `${baseUrl}${movieId}/videos?api_key=${apiKey}`;
    const creditsApi = `${baseUrl}${movieId}/credits?api_key=${apiKey}`;
    const recommendationsApi = `${baseUrl}${movieId}/recommendations?api_key=${apiKey}`;
    
    axios
      .get(videosApi)
      .then((res) => {
        console.log('videos: ', res.data);
        setTrailers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
      
    axios
      .get(detailsApi)
      .then((res) => {
        console.log('details: ', res.data);
        setDetails(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(creditsApi)
      .then((res) => {
        console.log('credits: ', res.data);
        setCredits(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(recommendationsApi)
      .then((res) => {
        console.log('recommendations: ', res.data);
        setRecommendations(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

  };

  useEffect(() => {
    fetchMovie();
    console.log(movieTrailers);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="body-container--movie">
      <header>
        <div className="header">
          <img className="header-bg" src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt=""/>
          <div className="shade"></div>
          <div className="header-details">
            <div className="movie-title">
              {movieDetails.name || movieDetails.title}
            </div>
            <div className="movie-year-genre">
              <span>
                {
                  (movieDetails.first_air_date && movieDetails.first_air_date.split('-')[0]) ||
                  (movieDetails.release_date && movieDetails.release_date.split('-')[0])
                }
              </span>
              <span>
                &#8226;
              </span>
              {movieDetails.genres && movieDetails.genres.map((value, index) => {
                return <span key={index}>{value.name}</span>;
              })}
            </div>
            <div className="movie-cta">
              <div className="button button1">Play trailer</div>
              <div className="button button2">
                <div className="add-to-watchlist-icon">
                  <svg height="20px" fill="#f2d024" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="20px">
                    <path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z"/>
                  </svg>
                </div>
                Add to watchlist
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="ratings-container">
          <div className="rating">
            <div className="rating-value">{movieDetails.vote_average}/10</div>
            <div className="rating-source">TMDb</div>
          </div>
        </div>

        <div className="about-movie">
          <Tabs selectedTabClassName="tab--selected">
            <TabList className="tab-list">
              <Tab className="tab">Summary</Tab>
              <Tab className="tab">Cast</Tab>
              <Tab className="tab">More Like This</Tab>
            </TabList>

            <TabPanel>
              <p className="movie-summary">{movieDetails.overview}</p>
            </TabPanel>
            <TabPanel>
              <div className="cast-list">
              {movieCredits.cast && movieCredits.cast.map((value, index) => {
                return (
                  <div key={index} className="tab-results">
                    <img className="profile" src={`https://image.tmdb.org/t/p/w500${value.profile_path}`} alt=""/>
                    <div className="tab-item__name">
                      <span className="name--bold">{value.name}</span>
                      <span className="name--light">{value.character}</span>
                    </div>
                  </div>
                );
              })}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="recommendations-list">
                {movieRecommendations.results && movieRecommendations.results.map((value, index) => {
                  return (
                    <div key={index} className="tab-results clickable" onClick={() => window.location.href = `/movie?id=${value.id}&type=${mediaType}`}>
                      <img className="profile" src={`https://image.tmdb.org/t/p/w500${value.poster_path}`} alt=""/>
                      <div className="tab-item__name">
                        <span className="name--bold">{value.name || value.title}</span>
                        <span className="name--light">{value.first_air_date || value.release_date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default Movie;