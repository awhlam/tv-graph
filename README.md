# TV Graph
See ratings for TV shows by season and episode over time.

Try it out: [televisiongraph.herokuapp.com](https://televisiongraph.herokuapp.com)

![2022-02-07 09 36 28](https://user-images.githubusercontent.com/32132177/152841774-99ce77e9-f896-4ec4-a6af-5a46dc8fcb6a.gif)
## Setup
1. Install dependencies:
```
npm install
```
2. Obtain an API key from the [TMDB](https://developers.themoviedb.org/3/getting-started/introduction).
3. Rename `.env.example` to `.env` and fill in your API key.
4. Build scripts:
```
npm run build
```
5. Start the server:
```
npm start
```
6. Open the site:
```
http://localhost:3000
```

## Notes
- This product uses the [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction) but is not endorsed or certified by TMDB.
- Episodes with 0 votes are excluded from the chart.

## Dependencies
- [React](https://reactjs.org)
- [Axios](https://axios-http.com)
- [Moment.js](https://momentjs.com)
- [Node.js](https://nodejs.org/en) / [Express](https://expressjs.com)
- [Webpack](https://webpack.js.org) / [Babel](https://babeljs.io)
- [Chart.js](https://www.chartjs.org)
- [react-chartjs-2](https://react-chartjs-2.netlify.app)
- [chartjs-plugin-annotation](https://www.chartjs.org)
- [chartjs-plugin-trendline](https://github.com/Makanz/chartjs-plugin-trendline)
