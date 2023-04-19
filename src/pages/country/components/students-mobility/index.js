import { useOutletContext } from 'react-router-dom';
import { Container, Col, Row } from '@dataesr/react-dsfr';
import ChartComponents from '../chart-components';
import MobilityCallOut from './components/mobility';

import HtmlAmbassyBloc from '../../../../components/html-ambassy-bloc';
import charts from './charts.json';

export default function StudentsMobilityPage() {
  const contextData = useOutletContext();
  const analyse = contextData['curiexplore-analyse'];

  const blocs = [];
  if (analyse.length !== 0) {
    blocs.push(analyse.find((el) => (el.fields.thematique === 'Mobilité entrante')).fields || null);
    blocs.push(analyse.find((el) => (el.fields.thematique === 'Mobilité sortante')).fields || null);
  }

  return (
    <Container>
      <MobilityCallOut />
      <Row>
        <Col>
          {blocs.map((bloc) => (
            <HtmlAmbassyBloc data={bloc} />
          ))}
        </Col>
      </Row>
      <Row>
        <Col n="12">
          <ChartComponents charts={charts} />
        </Col>
      </Row>
    </Container>
  );
}
