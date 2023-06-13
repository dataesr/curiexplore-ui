/* eslint-disable max-len */
import { useOutletContext } from 'react-router-dom';
import { Text } from '@dataesr/react-dsfr';
import ChartComponents from '../chart-components';
import HtmlAmbassyBloc from '../../../../components/html-ambassy-bloc';

import Title from '../../../../components/title';
import charts from './charts.json';
import PieChart from './components/donut/index';
import Pyramid from './components/pyramid/index';
import EducationIndex from './components/education-index';
import Overview from './components/overview';

export default function CountryHigherEducationPage() {
  const contextData = useOutletContext();
  const data = contextData['curiexplore-analyse'];
  const dataIDH = contextData['curiexplore-donnees-quantitatives'];
  let dataES = [];

  if (data.length !== 0) {
    dataES = data.find((el) => (el.fields.codethematique === 'A5'))?.fields || null;
  } else {
    dataES = '';
  }

  const subTitle = (
    <Text className="fr-mb-1w">
      Les informations présentes ci-dessous sont collectées par le département des outils d'aide à la décision du Ministère de l'enseignement supérieur et de la recherche (MESR) et sont mises à jour 1 à 2 fois par an.
      <br />
      L'année de référence pour les indicateurs affichés en base 100 est l'année de la première donnée disponible par indicateur par pays.
    </Text>
  );

  return (
    <>
      <Overview
        data={dataIDH}
      />
      <HtmlAmbassyBloc data={dataES} />
      <Title
        as="h3"
        title="Les données de l'enseignement supérieur"
        subTitle={subTitle}
        icon=""
      />
      <Pyramid />
      <PieChart />
      <EducationIndex data={dataIDH} />
      <ChartComponents charts={charts} />

    </>
  );
}
