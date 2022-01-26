import fontStyle from './GraphStyles';

const randColor = () => {
  const num1 = Math.floor(Math.random() * 256);
  const num2 = Math.floor(Math.random() * 256);
  const num3 = Math.floor(Math.random() * 256);
  return `rgba(${num1}, ${num2}, ${num3}, 0.1)`;
};

const annotateSeason = (season, start, end) => ({
  type: 'box',
  backgroundColor: randColor(),
  borderWidth: 1,
  xMin: start,
  xMax: end,
  label: {
    drawTime: 'afterDraw',
    enabled: true,
    content: `Season ${season}`,
    font: fontStyle(18),
    position: {
      x: 'center',
      y: 'start',
    },
  },
});

const annotateShow = (showData) => {
  // count number of episodes in each season
  const epCounts = {};
  Object.keys(showData.episodes).forEach((ep) => {
    const season = ep.split('.')[0];
    if (!epCounts[season]) {
      epCounts[season] = 1;
    } else {
      epCounts[season] += 1;
    }
  });

  // generate each season's annotation
  let firstEp = 0;
  let lastEp = 1;
  const annotations = {};
  Object.keys(epCounts).forEach((season) => {
    lastEp = firstEp + epCounts[season];
    annotations[season] = annotateSeason(season, firstEp, lastEp);
    firstEp = lastEp;
  });

  return annotations;
};

export default annotateShow;
