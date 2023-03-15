import { createRef } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from '@dataesr/react-dsfr';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import useFetchData from './hooks/useFetchData';

import charts from './charts.json';
import ChartTitle from '../../../../../../components/chart-title';

export default function PieChartComponent() {
  const { isoCode } = useParams();
  const { options, title } = useFetchData({ charts, countryCode: isoCode });
  const chart = createRef();

  const source = (
    <>
      Source :
      &nbsp;
      <Link href="https://www.unesco.org/fr" target="_blank">UNESCO</Link>
    </>
  );
  return (
    <section>
      <ChartTitle title={title} subTitle={source} />
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chart}
      />
    </section>
  );
}
