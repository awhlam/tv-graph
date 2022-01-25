const axios = require('axios');

const searchShow = async (req, res) => {
  // search show name to get show ID

  const tvId = '1405';
  // search show ID to get seasons

  // search season to get episode names, date, rating, vote count

  const seasons = [1, 2, 3, 4, 5, 6, 7, 8];
  let episodes = {};

  try {
    (async () => {
      // fetch all season data asynchronously
      await Promise.all(seasons.map(async (season) => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${tvId}/season/${season}?api_key=${process.env.API_KEY}`);
        data.episodes.forEach((ep) => {
          const epNum = `${ep.season_number}.${String(ep.episode_number).padStart(2, '0')}`;
          episodes[epNum] = ep.vote_average;
        });
      }));

      // sort episodes in ascending order
      episodes = Object.fromEntries(
        Object.entries(episodes).sort( (a,b) => a[0] - b[0] )
      );

      // return sorted episode data
      res.send(episodes);
    })();
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  searchShow,
};
