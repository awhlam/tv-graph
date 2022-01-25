const axios = require("axios");

const API = "https://api.themoviedb.org/3";

const searchShow = async (req, res) => {

  const query = req.query;
  console.log(query)

  try {
    // search show name to get show ID
    const show = await axios.get(
      `${API}/search/tv?api_key=${process.env.API_KEY}`, { params: query }
    );

    const tvId = show.data.results[0].id;

    // search show ID to get seasons
    const { data } = await axios.get(
      `${API}/tv/${tvId}?api_key=${process.env.API_KEY}`
    );

    // generate array of season numbers
    const seasons = Array.from(
      { length: data.number_of_seasons },
      (v, k) => k + 1
    );

    // fetch all season data asynchronously
    (async () => {
      let episodes = {};

      await Promise.all(
        seasons.map(async (season) => {
          const { data } = await axios.get(
            `${API}/tv/${tvId}/season/${season}?api_key=${process.env.API_KEY}`
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
    }
  )();
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  searchShow,
};
