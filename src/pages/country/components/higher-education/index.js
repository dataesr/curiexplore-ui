import { useOutletContext, useParams } from 'react-router-dom';
import { Container, Col, Row } from '@dataesr/react-dsfr';
import ChartComponents from '../chart-components';
import HtmlAmbassyBloc from '../../../../components/HtmlAmbassyBloc';

import charts from './charts.json';

export default function CountryHigherEducationPage() {
  const { isoCode } = useParams();

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
          <ChartComponents charts={charts} isoCode={isoCode} />
        </Col>
      </Row>
    </Container>
  );
}
