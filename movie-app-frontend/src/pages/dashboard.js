import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../services/tmdb';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getPopularMovies();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  const handleLike = async (movie) => {
    const token = localStorage.getItem('token');

  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/user/like`,
      { 
        movieId: movie.id, 
        genres: movie.genre_ids 
      },
      { 
        headers: { 
          Authorization: `Bearer ${token}`, 
        }, 
      }
    );
    alert('Liked!');
  } catch (err) {
    console.error('Like error:', err.response?.data || err.message);
    alert('Failed to like the movie.');
  }
};

const handleWatchlist = async (movieId) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/user/watchlist`,
      { movieId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert('Added to watchlist!');
  } catch (err) {
    console.error(err);
    alert('Failed to add to watchlist.');
  }
};

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Popular Movies</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movie/${movie.id}`}>
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-rating">Rating: {movie.vote_average}</p>
              <button onClick={() => handleLike(movie)}> 💖 Like</button>
              <button onClick={() => handleWatchlist(movie.id)}>📑 Watchlist</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
