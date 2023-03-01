import { useOutletContext } from 'react-router-dom';
import { Container, Col, Row } from '@dataesr/react-dsfr';
import ChartComponents from '../chart-components';
import HtmlAmbassyBloc from '../../../../components/HtmlAmbassyBloc';

import charts from './charts.json';
import PieChart from './components/donut/index';
import Pyramid from './components/pyramid/index';

export default function CountryHigherEducationPage() {
  const contextData = useOutletContext();
  const data = contextData['curiexplore-analyse'];

  const dataES = data.find((el) => (el.fields.thematique === 'Enseignement supérieur')).fields || null;

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
      <Row>
        <Col>
          <ChartComponents charts={charts} />
        </Col>
      </Row>
    </Container>
  );
}
