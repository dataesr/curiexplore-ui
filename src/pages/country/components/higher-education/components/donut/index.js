import { createRef } from 'react';
import { useParams } from 'react-router-dom';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { Highlight } from '@dataesr/react-dsfr';
import useFetchData from './hooks/useFetchData';

import charts from './charts.json';
import ChartTitle from '../../../../../../components/title';

export default function PieChartComponent() {
  const { isoCode } = useParams();
  const { options, title } = useFetchData({ charts, countryCode: isoCode });
  const chart = createRef();

  const source = (
    <p>
      Source:&nbsp;
      <a href="https://www.unesco.org/fr" target="_blank" rel="noreferrer">UNESCO</a>
    </p>
  );

  const explanation = (
    <p>
      Les domaines d'études sont définis par la&nbsp;
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
    </p>
  );

  return (
    <section>
      <ChartTitle
        title={title}
        icon="ri-donut-chart-fill"
        subTitle={source}
        as="h4"
        look="h4"
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chart}
      />
      <Highlight>
        {explanation}
      </Highlight>
    </section>
  );
}
