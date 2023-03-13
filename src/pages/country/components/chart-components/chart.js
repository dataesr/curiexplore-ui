import { Col } from '@dataesr/react-dsfr';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';

import useFetchData from './hooks/useFetchData';

export default function Chart({ data, otherCodes, countryCode, hasDataHandler }) {
  const { options } = useFetchData({
    code: data.code,
    sort: data.sort,
    title: data.title,
    type: data.type,
    otherCodes,
    countryCode,
    source: data.source,
  });

  // test des données
  let nbEmpty = 0;
  options.series.forEach((el) => {
    if (el.data.length === 0) nbEmpty += 1;
  });
  if (nbEmpty === options.series.length) {
    return null;
  }
  hasDataHandler(true);

  return (
    <Col n="6">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </Col>
  );
}

Chart.propTypes = {
  data: PropTypes.object.isRequired,
  otherCodes: PropTypes.array.isRequired,
  countryCode: PropTypes.string.isRequired,
  hasDataHandler: PropTypes.func.isRequired,
};
