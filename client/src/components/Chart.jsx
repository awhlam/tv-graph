import React from "react";
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

const labels = ["Season 1", "Season 2", "Season 3", "Season 4"];

const data = {
  labels,
  datasets: [
    {
      label: "Viewer Rating",
      data: [8.5, 4.5, 5.5, 7.3],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const Chart = () => {
  return <Line options={options} data={data} />;
};

export default Chart;
