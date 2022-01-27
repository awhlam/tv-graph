import animation from './GraphAnimation';
import annotateShow from './GraphAnnotations';
import fontStyle from './GraphStyles';

const graphOptions = (showData, beginAtZero, data) => ({
  animation: animation(showData),
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    annotation: {
      annotations: annotateShow(showData),
    },
    tooltip: {
      xAlign: 'center',
      yAlign: 'top',
      padding: 14,
      titleFont: fontStyle(18),
      bodyFont: fontStyle(16),
      bodySpacing: 4,
      borderColor: 'red',
      borderWidth: 1,
      displayColors: false,
      callbacks: {
        label: (tooltipItem) => {
          const index = tooltipItem.dataIndex;
          return data.datasets.map((ds) => {
            let label = '';
            if (['Rating', 'Votes'].includes(ds.label)) {
              label = `${ds.label} - `;
            }
            return `${label}${ds.data[index]}`;
          });
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font: fontStyle(18),
        color: 'black',
      },
      title: {
        display: true,
        text: 'Season.Episode',
        font: fontStyle(24),
        color: 'black',
      },
    },
    y: {
      beginAtZero,
      ticks: {
        font: fontStyle(18),
        color: 'black',
      },
      title: {
        display: true,
        text: 'Rating',
        font: fontStyle(24),
        color: 'black',
      },
    },
  },
});

export default graphOptions;
