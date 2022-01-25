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

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Game of Thrones',
        font: fontProps
      }
    },
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
    labels: Object.keys(showData),
    datasets: [
      {
        data: Object.values(showData),
        label: "Viewer Rating",
        borderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  return (
    <Line
      options={options}
      data={data}
      height={120}
    />
  );
};

export default Chart;
