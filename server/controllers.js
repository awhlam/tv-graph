const models = require('./models');
const axios = require('axios');

const searchShow = async (req, res) => {
  let chartData = {};
  let tvId;
  let seasons = [];

  try {
    const { data } = await models.getShow(req.query);
    chartData = data.results[0];
    showId = data.results[0].id;
  } catch (e) {
    res.status(500).send('Could not find show');
    return;
  }

  try {
    const { data } = await models.getSeasons(showId);
    seasons = Array.from(
      { length: data.number_of_seasons },
      (v, k) => k + 1,
    );
  } catch (e) {
    res.status(500).send('Failed to search for seasons');
    return;
  }

  try {
    (async () => {
      let episodes = {};
      await Promise.all(
        seasons.map(async (season) => {
          const { data } = await models.getEpisodes(season);
          data.episodes.forEach((ep) => {
            if (ep.vote_count) {
              const epNum = `${ep.season_number}.${String(ep.episode_number).padStart(2, "0")}`;
              episodes[epNum] = {
                vote_average: ep.vote_average,
                air_date: ep.air_date,
                name: ep.name,
                vote_count: ep.vote_count,
              };
            }
          });
        })
      );
      chartData.episodes = Object.fromEntries(
        Object.entries(episodes).sort((a, b) => a[0] - b[0])
      );
      res.send(chartData);
    })();
  } catch (e) {
    res.status(500).send('Failed to search for episodes');
    return;
  }
};

module.exports = {
  searchShow,
};
