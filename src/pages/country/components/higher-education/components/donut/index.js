import { createRef } from 'react';
import { useParams } from 'react-router-dom';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import useFetchData from './hooks/useFetchData';

import charts from './charts.json';
import ChartTitle from '../../../../../../components/title';

export default function PieChartComponent() {
  const { isoCode } = useParams();
  const { options, title } = useFetchData({ charts, countryCode: isoCode });
  const chart = createRef();

  const source = (
    <p>
      Les domaines d'études sont définis par la&nbps;
      <strong>classification internationale type de l'éducation (CITE)</strong>
      .
      Cet outil est issu des classifications économiques et sociales des Nations Unies et permet d'établir des
      statistiques comparables à un niveau international. La dernière version date de 2013 et s'applique aux données à partir de
      2016, voir le&nbsp;
      <a
        href="https://uis.unesco.org/sites/default/files/documents/isced-fields-of-education-and-training-2013-fr.pdf"
        target="_blank"
        rel="noreferrer"
      >
        détail
      </a>
      .
      <br />
      Source:
      <a href="https://www.unesco.org/fr" target="_blank" rel="noreferrer">UNESCO</a>
    </p>
  );

  return (
    <section>
      <ChartTitle
        title={title}
        icon="ri-bar-chart-horizontal-fill"
        subTitle={source}
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chart}
      />
    </section>
  );
}
