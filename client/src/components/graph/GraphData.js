const moment = require('moment');

const graphData = (showData) => ({
  labels: Object.keys(showData.episodes),
  datasets: [
    {
      data: Object.values(showData.episodes).map((value) => value.name),
      label: 'Name',
      hidden: true,
    },
    {
      data: Object.values(showData.episodes).map((value) => {
        const date = moment(value.air_date);
        return date.format('MMMM Do, YYYY');
      }),
      label: 'Date',
      hidden: true,
    },
    {
      data: Object.values(showData.episodes).map((value) => value.vote_average),
      label: 'Rating',
      borderColor: 'red',
      backgroundColor: 'red',
      borderWidth: 2.5,
      trendlineLinear: {
        style: 'black',
        lineStyle: 'dotted',
        width: 1,
      },
    },
    {
      data: Object.values(showData.episodes).map((value) => value.vote_count),
      label: 'Votes',
      hidden: true,
    },
  ],
});

export default graphData;
