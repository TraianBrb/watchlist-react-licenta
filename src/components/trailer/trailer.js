import React, { useEffect, useState } from 'react';
import './trailer.scss';

import axios from 'axios';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Trailer = () => {
  let query = useQuery();
  const [movieTrailer, setTrailer] = useState();

  const movieId = query.get('id');
  const mediaType = query.get('type');
  const baseUrl = `https://api.themoviedb.org/3/${mediaType}/`;
  const apiKey = process.env.REACT_APP_MOVIE_DB_KEY;

  const fetchMovie = () => {
    const videosApi = `${baseUrl}${movieId}/videos?api_key=${apiKey}`;

    axios
      .get(videosApi)
      .then((res) => {
        console.log('videos: ', res.data);
        setTrailer(res.data.results.find(video => video.type === 'Trailer'));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMovie();
    console.log(movieTrailer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="body-container">
      <iframe title={movieTrailer && movieTrailer.id} width="560" height="315" 
        src={movieTrailer && `https://www.youtube.com/embed/${movieTrailer && movieTrailer.key}`}
        frameBorder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen>
      </iframe>
    </div>
  );
}

export default Trailer;