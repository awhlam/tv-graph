import React from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import chartTrendline from 'chartjs-plugin-trendline';
import { Line } from 'react-chartjs-2';
import graphOptions from './GraphOptions';
import graphData from './GraphData';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  annotationPlugin,
  chartTrendline,
);

function Graph({ showData, beginAtZero }) {
  const data = graphData(showData);
  return (
    <div className="chart">
      <Line
        options={graphOptions(showData, beginAtZero, data)}
        data={data}
        height={100}
      />
    </div>
  );
}

export default Graph;
