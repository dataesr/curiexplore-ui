import { createRef } from 'react';
import { useParams } from 'react-router-dom';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { Callout, Text } from '@dataesr/react-dsfr';
import useFetchData from './hooks/useFetchData';

import charts from './charts.json';
import ChartTitle from '../../../../../../components/title';

export default function PyramidComponent() {
  const { isoCode } = useParams();
  const { options, title } = useFetchData({ charts, countryCode: isoCode });
  const chart = createRef();

  const source = (
    <Text>
      Source :&nbsp;
      <a href="https://www.unesco.org/fr" target="_blank" rel="noreferrer">UNESCO</a>
    </Text>
  );

  const explanation = (
    <Text>
      Les niveaux d'études sont définis par la&nbsp;
      <strong>classification internationale type de l'éducation (CITE)</strong>
      .
      L'enseignement supérieur est compris dans les niveaux 5, 6, 7 et 8 de la CITE.
      {' '}
      <br />
      <ul>
        <li>
          Le
          {' '}
          <strong>niveau 5</strong>
          {' '}
          de la CITE équivaut à un cycle court, c'est le plus bas niveau de l'enseignement supérieur
        </li>
        <li>
          Le
          {' '}
          <strong>niveau 6</strong>
          {' '}
          de la CITE équivaut à niveau de licence
        </li>
        <li>
          Le
          {' '}
          <strong>niveau 7</strong>
          {' '}
          de la CITE équivaut à un niveau de master
        </li>
        <li>
          Le
          {' '}
          <strong>niveau 8</strong>
          {' '}
          de la CITE équivaut à un niveau de doctorat
        </li>
      </ul>
      Cet outil est issu des classifications économiques et sociales des Nations Unies et permet d'établir des
      statistiques comparables à un niveau international. Voir la&nbsp;
      <a
        href="https://uis.unesco.org/sites/default/files/documents/international-standard-classification-of-education-isced-2011-fr.pdf"
        target="_blank"
        rel="noreferrer"
      >
        documentation de l'indicateur
      </a>
      .
    </Text>
  );

  return (
    options.total !== undefined && (
      <section className="fr-mb-1w">
        <ChartTitle
          title={title}
          icon="ri-bar-chart-horizontal-fill"
          subTitle={source}
          as="h4"
          look="h4"
        />
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chart}
        />
        <Callout hasInfoIcon={false}>
          {explanation}
        </Callout>
      </section>
    )
  );
}
