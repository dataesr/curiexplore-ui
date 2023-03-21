import { useOutletContext } from 'react-router-dom';
import { Container, Col, Row, Title } from '@dataesr/react-dsfr';
import ChartComponents from '../chart-components';
import HtmlAmbassyBloc from '../../../../components/html-ambassy-bloc';
import GenericCard from '../../../../components/generic-card';

import charts from './charts.json';
import PieChart from './components/donut/index';
import Pyramid from './components/pyramid/index';

export default function CountryHigherEducationPage() {
  const contextData = useOutletContext();
  const data = contextData['curiexplore-analyse'];
  const dataIDH = contextData['curiexplore-donnees-quantitatives'];

  const dataES = data.find((el) => (el.fields.thematique === 'Enseignement supérieur')).fields || null;

  // Nombre moyen d'années de scolarité
  const MOYSCO = { ...dataIDH.find((el) => el.fields.code === 'MOYSCO').fields };

  // Espérance de scolarisation
  const ESPSCO = { ...dataIDH.find((el) => el.fields.code === 'ESPSCO').fields };

  const getDescription = (code) => {
    if (code.code === 'MOYSCO') {
      return (
        <Title as="h3">{`${code.value.toFixed(1)} ${code.unit}`}</Title>
      );
    }
    if (code.code === 'ESPSCO') {
      return (
        <Title as="h3">{`${code.value.toFixed(1)} ${code.unit}`}</Title>
      );
    }
    return null;
  };

  return (
    <Container>
      <Row>
        <Col>
          <HtmlAmbassyBloc data={dataES} />
        </Col>
      </Row>
      <Row>
        <Col>
          <PieChart />
        </Col>
      </Row>
      <Row>
        <Col>
          <Pyramid />
        </Col>
      </Row>
      <Row gutters>
        <Col n="6">
          <GenericCard
            badgeLabel={MOYSCO.year}
            description={getDescription(MOYSCO)}
            title={MOYSCO.label}
          />
        </Col>
        <Col n="6">
          <GenericCard
            badgeLabel={ESPSCO.year}
            description={getDescription(ESPSCO)}
            title={ESPSCO.label}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <ChartComponents charts={charts} />
        </Col>
      </Row>
    </Container>
  );
}
