import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Highlight } from '@dataesr/react-dsfr';

export default function BarChart({ categoriesText, data, height, slice, type }) {
  const top = data
    .slice(0, slice)
    .map((el) => ({ name: el.key_display_name, y: el.count }));

  const series = [{
    color: '#FFCA00',
    data: top.map((item) => item.y),
    name: 'Nombre de publications communes',
  }];

  const options = {
    chart: {
      type,
      height,
    },
    credits: { enabled: false },
    legend: { enabled: false },
    series,
    title: { text: '' },
    xAxis: { categories: top.map((item) => item.name), title: { text: categoriesText } },
    yAxis: { title: { text: 'Nombre de publications communes' } },
  };
  if (data?.length === 0) {
    return (
      <Highlight colorFamily="yellow-tournesol" size="sm" className="fr-ml-0 fr-my-1w">
        <i>No data to display for this graph</i>
      </Highlight>
    );
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
BarChart.defaultProps = {
  categoriesText: null,
  height: '400px',
  slice: 10,
  type: 'column',
};

BarChart.propTypes = {
  categoriesText: PropTypes.string,
  data: PropTypes.array.isRequired,
  height: PropTypes.string,
  slice: PropTypes.number,
  type: PropTypes.oneOf(['column', 'bar', 'area']),
};
