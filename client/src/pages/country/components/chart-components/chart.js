import { Col } from '@dataesr/react-dsfr';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';

import useFetchData from './hooks/useFetchData';

import './custom-style.scss';

export default function Chart({ countryCode, data, hasDataHandler, otherCodes }) {
  const { options } = useFetchData({
    base100: data.base100,
    code: data.code,
    countryCode,
    otherCodes,
    sort: data.sort,
    source: data.source,
    title: data.title,
    type: data.type,
    unit: data.unit,
  });

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
      {
        data?.description && (
          <div className="chart-description">
            {data.description}
          </div>
        )
      }
    </Col>
  );
}

Chart.propTypes = {
  countryCode: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  hasDataHandler: PropTypes.func.isRequired,
  otherCodes: PropTypes.array.isRequired,
};
