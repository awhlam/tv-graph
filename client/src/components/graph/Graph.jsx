import React from "react";
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Line } from "react-chartjs-2";
import chartTrendline from "chartjs-plugin-trendline";
import annotateShow from "./GraphAnnotations";

Chart.register(annotationPlugin);

const fontProp = (size) => {
  return {
    size: size,
    weight: 'bold',
    family: "'Roboto', sans-serif",
  }
}

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
