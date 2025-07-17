import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const favoriteMovieIds = res.data.favorites;

        // Fetch movie details from TMDb API
        const moviePromises = favoriteMovieIds.map(id =>
          axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: { api_key: process.env.REACT_APP_TMDB_API_KEY },
          })
        );
        const movies = await Promise.all(moviePromises);
        setFavorites(movies.map(m => m.data));
      } catch (err) {
        console.error(err);
      }
    }
    fetchFavorites();
  }, [token]);

  return (
    <div>
      <h2>Your Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favorites.map(movie => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            {/* show poster, overview, etc */}
          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;
