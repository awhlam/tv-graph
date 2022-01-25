import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const Chart = (showData) => {
  const data = {
    labels: showData.showData.episodeNums,
    datasets: [
      {
        data: showData.showData.vote_average,
        label: "Viewer Rating",
        borderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  return (
    <Line options={options} data={data} />
  );
};

export default Chart;
