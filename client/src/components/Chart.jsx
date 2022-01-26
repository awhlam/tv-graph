import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
);

const fontProps = {
  size: 24,
  weight: 'bold'
}

const Chart = ({showData, beginAtZero}) => {
  const delayBetweenPoints = 3000 / Object.keys(showData.episodes).length;
  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
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

  const options = {
    animation,
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Season & Episode Number",
          font: fontProps
        }
      },
      y: {
        beginAtZero: beginAtZero,
        title: {
          display: true,
          text: "Viewer Rating",
          font: fontProps
        }
      },
    },
  };

  const data = {
    labels: Object.keys(showData.episodes),
    datasets: [
      {
        data: Object.values(showData.episodes),
        label: "Viewer Rating",
        borderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  return (
    <div class="chart">
      <Line
        options={options}
        data={data}
        height={125}
      />
    </div>
  );
};

export default Chart;
