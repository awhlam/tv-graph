const axios = require("axios");

const API = 'https://api.themoviedb.org/3/tv'

const searchShow = async (req, res) => {
  // search show name to get show ID

  const tvId = "1405";
  // search show ID to get seasons

  const { data } = await axios.get(
    `${API}/${tvId}?api_key=${process.env.API_KEY}`
  );
  const seasons = Array.from(
    { length: data.number_of_seasons },
    (v, k) => k + 1
  );

  // search season to get episode names, date, rating, vote count

  try {
    (async () => {
      let episodes = {};

      // fetch all season data asynchronously
      await Promise.all(
        seasons.map(async (season) => {
          const { data } = await axios.get(
            `${API}/${tvId}/season/${season}?api_key=${process.env.API_KEY}`
          );
          data.episodes.forEach((ep) => {
            const epNum = `${ep.season_number}.${String(
              ep.episode_number
            ).padStart(2, "0")}`;
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
    res.status(500).send(e);
  }
};

module.exports = {
  searchShow,
};
