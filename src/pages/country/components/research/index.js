import { useOutletContext, useParams } from 'react-router-dom';
import { Container, Col, Row, Title } from '@dataesr/react-dsfr';
import ChartComponents from '../chart-components';
import HtmlAmbassyBloc from '../../../../components/HtmlAmbassyBloc';
import ScimagoChart from './components/scimago';

import charts from './charts.json';

export default function CountryResearchPage() {
  const { isoCode } = useParams();

  const contextData = useOutletContext();
  const data = contextData['curiexplore-analyse'];

  const dataRI = data.find((el) => (el.fields.thematique === 'Recherche et innovation')).fields || null;

  return (
    <Container>
      <Row>
        <Col n="12">
          <HtmlAmbassyBloc data={dataRI} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ScimagoChart />
        </Col>
      </Row>
      <Row>
        <Col>
          <Title as="h3">Données quantitatives</Title>
          <ChartComponents charts={charts} isoCode={isoCode} />
        </Col>
      </Row>
    </Container>
  );
}
