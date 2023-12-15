import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export default function AppScratchStatus({ title, subheader, chart, ...other }) {
  const { labels, colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '30%',
      },
      area: {
      
      }
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    xaxis: {
      type: 'datetime',
    },
    yaxis: [{
      seriesName: 'Body',
    }, {
      seriesName: 'Lower',
      show: false,
    },{
      seriesName: 'Hand',
      show: false,
    },{
      opposite: true,
      seriesName: 'Percent',
      min: -100,
      max: 120
    }],
    tooltip: {
      intersect: false,
      shared: true,
      y: {
        formatter: (value,  name ) => {
          if(name.seriesIndex === 3) {
            return `${value.toFixed(0)}%`;  
          }         
          return `${value.toFixed(0)} min`;
        }
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} />

      <Box sx={{ p: 2, pb: 0 }}>
        <Chart
          dir="ltr"
          type="bar"
          series={series}
          options={chartOptions}
          width="100%"
          height={300}
        />
      </Box>
    </Card>
  );
}

AppScratchStatus.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
