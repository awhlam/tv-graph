const graphData = (showData) => ({
  labels: Object.keys(showData.episodes),
  datasets: [
    {
      data: Object.values(showData.episodes).map((value) => value.name),
      label: 'Name',
      hidden: true,
    },
    {
      data: Object.values(showData.episodes).map((value) => value.air_date),
      label: 'Air Date',
      hidden: true,
    },
    {
      data: Object.values(showData.episodes).map((value) => value.vote_average),
      label: 'Rating',
      borderColor: 'black',
      backgroundColor: 'black',
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
