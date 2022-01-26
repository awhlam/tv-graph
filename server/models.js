const axios = require('axios');
const API = 'https://api.themoviedb.org/3';

const getShow = (query) => axios.get(`${API}/search/tv?api_key=${process.env.API_KEY}`, { params: query });
const getSeasons = (showId) => axios.get(`${API}/tv/${showId}?api_key=${process.env.API_KEY}`);
const getEpisodes = (season) => axios.get(`${API}/tv/${showId}/season/${season}?api_key=${process.env.API_KEY}`);

module.exports = {
  getShow,
  getSeasons,
  getEpisodes,
};
