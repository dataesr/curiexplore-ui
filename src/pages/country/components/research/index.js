/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { Container, Col, Row, Title, Highlight } from '@dataesr/react-dsfr';
import ChartComponents from '../chart-components';
import HtmlAmbassyBloc from '../../../../components/html-ambassy-bloc';
import ScimagoChart from './components/scimago';

import charts from './charts.json';
import ThematicsChart from '../../../../components/open-alex-charts/thematics-chart';

export default function CountryResearchPage() {
  const { isoCode } = useParams();
  const contextData = useOutletContext();
  const [iso2, setIso2] = useState('');
  const data = contextData['curiexplore-analyse'];
  let dataRI = [];

  if (data.length !== 0) {
    dataRI = data.find((el) => (el.fields.thematique === 'Recherche et innovation')).fields || null;
  } else {
    dataRI = '';
  }

  useEffect(() => {
    setIso2(contextData['curiexplore-pays'].find((country) => country.fields.iso3 === isoCode).fields.iso2);
  }, [contextData, isoCode]);

  return (
    <Container>
      <Row>
        <Col n="12">
          <HtmlAmbassyBloc data={dataRI} />
        </Col>
      </Row>
      <Row>
        <Title as="h3">
          Les données de la recherche et de l'innovation
        </Title>
      </Row>
      <Row>
        <Highlight className="fr-mb-3w">
          Les informations présentes ci-dessous sont collectées par le département des outils d'aide à la décision du Ministère de l'enseignement supérieur et de la recherche (MESR) et sont mises à jour 1 à 2 fois par an.
        </Highlight>
      </Row>
      <Row>
        <Col>
          <ScimagoChart />
        </Col>
      </Row>
      <ThematicsChart iso2={iso2} iso3={isoCode} />
      <Row>
        <Col>
          <ChartComponents charts={charts} />
        </Col>
      </Row>
    </Container>
  );
}
