const randColor = () =>  {
  const num1 = Math.floor(Math.random() * 256);
  const num2 = Math.floor(Math.random() * 256);
  const num3 = Math.floor(Math.random() * 256);
  return `rgba(${num1}, ${num2}, ${num3}, 0.25)`
}

const annotateSeason = (season, start, end) => {
  return {
    type: 'box',
    backgroundColor: randColor(),
    borderWidth: 0,
    xMax: end,
    xMin: start,
    label: {
      drawTime: 'afterDraw',
      enabled: true,
      content: `Season ${season.toString()}`,
      position: {
        x: 'center',
        y: 'start'
      }
    }
  }
};

const annotateShow = (showData) => {
  // count number of episodes in each season
  const epCounts = {};
  for (const ep in showData.episodes) {
    const season = ep[0];
    if (!epCounts[season]) {
      epCounts[season] = 1;
    } else {
      epCounts[season]++;
    }
  }

  // generate each season's annotation
  let firstEp = 0;
  let lastEp = 1;
  const annotations = {};
  for (const season in epCounts) {
    lastEp = firstEp + epCounts[season];
    annotations[season] = annotateSeason(season, firstEp, lastEp);
    firstEp = lastEp;
  }

  return annotations;
}

export default annotateShow;