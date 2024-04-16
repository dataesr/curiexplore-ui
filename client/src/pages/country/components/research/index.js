/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { Text } from '@dataesr/react-dsfr';
import ChartComponents from '../chart-components';
import HtmlAmbassyBloc from '../../../../components/html-ambassy-bloc';
import ScimagoChart from './components/scimago';
import Overview from './components/overview';

import Title from '../../../../components/title';
import charts from './charts.json';
import ThematicsChart from '../../../../components/open-alex-charts/thematics-chart';
import { useTitle } from '../../../../hooks/usePageTitle';

export default function CountryResearchPage() {
  const { isoCode } = useParams();
  const contextData = useOutletContext();
  const [iso2, setIso2] = useState('');
  const data = contextData['curiexplore-analyse'];
  const dataOverview = contextData['curiexplore-donnees-quantitatives'];
  let dataRI = [];
  useTitle('Recherche et Innovation - CurieXplore');

  const charts1st = charts.filter((indic) => indic.theme === 'budget');
  const charts2nd = charts.filter((indic) => indic.theme === 'personnel');

  if (data.length !== 0) {
    dataRI = data.find((el) => (el.fields.codethematique === 'A6'))?.fields || null;
  } else {
    dataRI = '';
  }

  useEffect(() => {
    setIso2(contextData['curiexplore-pays'].find((country) => country.fields.iso3 === isoCode).fields.iso2);
  }, [contextData, isoCode]);

  const subTitle = (
    <Text className="fr-mb-1w">
      Les informations présentes ci-dessous sont collectées par le département ingénierie et science des données du Ministère de l'enseignement supérieur et de la recherche (MESR) et sont mises à jour 1 à 2 fois par an.
      <br />
      L'année de référence pour les indicateurs affichés en base 100 est l'année de la première donnée disponible par indicateur par pays.
    </Text>
  );

  return (
    <>
      <Overview
        data={dataOverview}
      />
      <HtmlAmbassyBloc data={dataRI} />
      <Title
        as="h3"
        title="Les données de la recherche et de l'innovation"
        icon=""
        subTitle={subTitle}
      />
      <ScimagoChart />
      <ThematicsChart iso2={iso2} iso3={isoCode} />
      <ChartComponents
        title="Les données financières de la recherche et de l'innovation"
        charts={charts1st}
      />
      <ChartComponents
        title="Les données du personnel de la recherche et de l'innovation"
        charts={charts2nd}
      />
    </>
  );
}
