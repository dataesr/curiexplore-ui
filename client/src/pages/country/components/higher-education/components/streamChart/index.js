import { createRef } from 'react';
import { Title } from '@dataesr/react-dsfr';
import { useParams } from 'react-router-dom';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsStreamGraph from 'highcharts/modules/streamgraph';

import useFetchData from './hooks/useFetchData';

import charts from './charts.json';

HighchartsStreamGraph(Highcharts);

export default function StreamChartComponent() {
  const { isoCode } = useParams();
  const { options } = useFetchData({ charts, countryCode: isoCode });
  const chart = createRef();

  return (
    <>
      <Title as="h3">Titre</Title>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chart}
      />
    </>
  );
}
