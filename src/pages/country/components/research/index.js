import { useOutletContext } from 'react-router-dom';
import { Container, Col, Row, Title } from '@dataesr/react-dsfr';
import ChartComponents from '../chart-components';
import HtmlAmbassyBloc from '../../../../components/HtmlAmbassyBloc';
import ScimagoChart from './components/scimago';

import charts from './charts.json';
import ChartTitle from '../../../../components/chart-title';

export default function CountryResearchPage() {
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
          <ChartTitle title="Données quantitatives" icon="ri-bar-chart-fill" />
          <ChartComponents charts={charts} />
        </Col>
      </Row>
    </Container>
  );
}
