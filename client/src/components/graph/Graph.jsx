import React from "react";
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Line } from "react-chartjs-2";
import chartTrendline from "chartjs-plugin-trendline";

Chart.register(annotationPlugin);

const fontProp = (size) => {
  return {
    size: size,
    weight: 'bold',
    family: "'Roboto', sans-serif",
  }
}

const randColor = () =>  {
  const num1 = Math.floor(Math.random() * 256);
  const num2 = Math.floor(Math.random() * 256);
  const num3 = Math.floor(Math.random() * 256);
  return `rgba(${num1}, ${num2}, ${num3}, 0.25)`
}

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

  return annotations
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

const Graph = ({showData, beginAtZero}) => {
  // ANIMATION
  const delayBetweenPoints = 3000 / Object.keys(showData.episodes).length;
  const previousY = (ctx) => {
    if (ctx.index === 0 || !ctx.index) {
      ctx.chart.scales.y.getPixelForValue(100);
    } else {
      ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    }
  }
  const animation = {
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
      }
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
      }
    }
  };

  // OPTIONS
  const options = {
    animation,
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      annotation: {
        annotations: annotateShow(showData)
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem, chart) => {
            const index = tooltipItem.dataIndex;
            return data.datasets.map(ds => {
              let label = '';
              if (['Rating', 'Votes'].includes(ds.label)) {
                label = `${ds.label}: `;
              }
              return `${label}${ds.data[index]}`;
            })
          }
        }
      },
    },
    scales: {
      x: {
        ticks: { font: fontProp(18) },
        title: {
          display: true,
          text: "Season & Episode Number",
          font: fontProp(24),
        },
      },
      y: {
        beginAtZero: beginAtZero,
        ticks: { font: fontProp(18) },
        title: {
          display: true,
          text: "Rating",
          font: fontProp(24),
        }
      },
    },
  };

  // DATA
  const data = {
    labels: Object.keys(showData.episodes),
    datasets: [
      {
        data: Object.values(showData.episodes).map(value => value.name),
        label: "Name",
        hidden: true,
      },
      {
        data: Object.values(showData.episodes).map(value => value.air_date),
        label: "Air Date",
        hidden: true,
      },
      {
        data: Object.values(showData.episodes).map(value => value.vote_average),
        label: "Rating",
        borderColor: "rgb(255, 99, 132)",
        trendlineLinear: {
          style: "#FF9636",
          lineStyle: "dotted",
          width: 2
        }
      },
      {
        data: Object.values(showData.episodes).map(value => value.vote_count),
        label: "Votes",
        hidden: true,
      },
    ],
  };

  return (
    <div className="chart">
      <Line
        options={options}
        data={data}
        height={125}
      />
    </div>
  );
};

export default Graph;
