import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Recommendations() {
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/recommendations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovies(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Recommended For You</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>Rating: {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
