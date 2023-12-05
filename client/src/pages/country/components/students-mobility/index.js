/* eslint-disable max-len */
import { useOutletContext } from 'react-router-dom';
import { Text } from '@dataesr/react-dsfr';
import ChartComponents from '../chart-components';
import MobilityCallOut from './components/mobility';

import Title from '../../../../components/title';
import HtmlAmbassyBloc from '../../../../components/html-ambassy-bloc';
import charts from './charts.json';
import { useTitle } from '../../../../hooks/usePageTitle';

export default function StudentsMobilityPage() {
  const contextData = useOutletContext();
  const analyse = contextData['curiexplore-analyse'];
  useTitle('Mobilité étudiante - CurieXplore');

  const blocs = [];
  if (analyse.length !== 0) {
    blocs.push(analyse.find((el) => (el.fields.codethematique === 'A9'))?.fields || null);
    blocs.push(analyse.find((el) => (el.fields.codethematique === 'A10'))?.fields || null);
  }
  const subTitle = (
    <Text className="fr-mb-1w">
      Les informations présentes ci-dessous sont collectées par le département ingénierie et science des données du Ministère de l'enseignement supérieur et de la recherche (MESR) et sont mises à jour 1 à 2 fois par an.
      <br />
      L'année de référence pour les indicateurs affichés en base 100 est l'année de la première donnée disponible par indicateur par pays.
    </Text>
  );

  return (
    <>
      <MobilityCallOut />
      {blocs.map((bloc) => (
        <HtmlAmbassyBloc data={bloc} />
      ))}
      <Title
        as="h3"
        title="Les données de la mobilité étudiante"
        subTitle={subTitle}
        icon=""
      />
      <ChartComponents charts={charts} />
    </>
  );
}
