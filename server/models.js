const axios = require('axios');

const searchShow = (req, res) => {
  // search show name to get show ID

  // search show ID to get seasons

  // search season to get episode names, date, rating, vote count
  const tvId = '1405';
  const seasonNum = '8';

  axios.get(`https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNum}?api_key=${process.env.API_KEY}`)
    .then((api) => {
      res.send(api.data);
    });
};

module.exports = {
  searchShow,
};
