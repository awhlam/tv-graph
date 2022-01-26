const models = require('./models');
const axios = require('axios');

const searchShow = async (req, res) => {
  let chartData = {};
  console.log(req.query);
  let tvId;
  let seasons = [];

  // search show name
  try {
    const { data } = await models.getShow(req.query);
    showId = data.results[0].id;
    console.log('showId: ', showId);
  } catch (e) {
    res.status(500).send('Failed to search for show');
  }

  // search seasons
  try {
    const { data } = await models.getSeasons(showId);
    seasons = Array.from(
      { length: data.number_of_seasons },
      (v, k) => k + 1,
    );
    console.log('Seasons: ', seasons);
  } catch (e) {
    res.status(500).send('Failed to search for seasons');
  }

  // search episodes
  try {
    // fetch all season data asynchronously
    (async () => {
      let episodes = {};

      await Promise.all(
        seasons.map(async (season) => {
          const { data } = await models.getEpisodes(season);
          data.episodes.forEach((ep) => {
            const epNum = `${ep.season_number}.${String(ep.episode_number).padStart(2, "0")}`;
            episodes[epNum] = ep.vote_average;
          });
        })
      );

      // sort episodes in ascending order
      episodes = Object.fromEntries(
        Object.entries(episodes).sort((a, b) => a[0] - b[0])
      );

      // return sorted episode data
      res.send(episodes);
    })();
  } catch (e) {
    res.status(500).send('Failed to search for episodes');
  }
};

module.exports = {
  searchShow,
};
