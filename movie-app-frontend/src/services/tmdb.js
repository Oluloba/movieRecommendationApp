import axios from 'axios';

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export const getPopularMovies = async () => {
  const res = await tmdb.get('/movie/popular', {
    params: {
      api_key: process.env.REACT_APP_TMDB_API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
  return res.data.results;
};

/**
 * Search movies by title (query), genre, and year.
 * @param {Object} filters - { query: string, genre: string, year: string }
 * @returns Array of movie results
 */
export const searchMovies = async ({ query = '', genre = '', year = '' }) => {
  const params = {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
    language: 'en-US',
    query,
    page: 1,
    include_adult: false,
  };

  if (year) {
    params.year = year;
  }

  // To filter by genre
  if (!query) {
    const discoverParams = {
      api_key: process.env.REACT_APP_TMDB_API_KEY,
      language: 'en-US',
      page: 1,
      with_genres: genre,
      primary_release_year: year,
      sort_by: 'popularity.desc',
      include_adult: false,
    };
    const res = await tmdb.get('/discover/movie', { params: discoverParams });
    return res.data.results;
  }

  // If query is present, use search endpoint and filter by genre & year 
  const res = await tmdb.get('/search/movie', { params });

  if (genre || year) {
    return res.data.results.filter(movie => {
      const matchGenre = genre ? movie.genre_ids.includes(Number(genre)) : true;
      const matchYear = year ? new Date(movie.release_date).getFullYear() === Number(year) : true;
      return matchGenre && matchYear;
    });
  }

  return res.data.results;
};

export const getRecommendationsByGenres = async (genreIds = []) => {
  const params = {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
    language: 'en-US',
    page: 1,
    sort_by: 'popularity.desc',
    with_genres: genreIds.join(','),
  };

  const res = await tmdb.get('/discover/movie', { params });
  return res.data.results;
};

