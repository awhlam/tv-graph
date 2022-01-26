const animation = (showData) => {
  const delayBetweenPoints = 3000 / Object.keys(showData.episodes).length;

  const previousY = (ctx) => {
    if (ctx.index === 0 || !ctx.index) {
      ctx.chart.scales.y.getPixelForValue(100);
    } else {
      ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    }
  };

  return {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
  };
};

export default animation;
