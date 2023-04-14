import { createRef } from 'react';
import { useParams } from 'react-router-dom';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import useFetchData from './hooks/useFetchData';

import charts from './charts.json';
import ChartTitle from '../../../../../../components/title';

export default function PyramidComponent() {
  const { isoCode } = useParams();
  const { options, title } = useFetchData({ charts, countryCode: isoCode });
  const chart = createRef();

  const source = (
    <p>
      Les niveaux d'études sont définis par la&nbsp;
      <strong>classification internationale type de l'éducation (CITE)</strong>
      .
      L'enseignement supérieur est compris dans les niveaux 5, 6, 7 et 8 de la CITE. Cet outil est issu des classifications économiques et sociales des Nations Unies et permet d'établir des
      statistiques comparables à un niveau international. Voir le&nbsp;
      <a
        href="https://uis.unesco.org/sites/default/files/documents/international-standard-classification-of-education-isced-2011-fr.pdf"
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
        icon="ri-bar-chart-2-fill"
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
