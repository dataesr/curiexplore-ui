import { useParams } from 'react-router-dom';
import { Row, Col } from '@dataesr/react-dsfr';
import CountryMap from '../../../components/country-map';

export default function CountryProfilePage() {
  const { isoCode } = useParams();
  return (
    <Row>
      <Col n="12">
        <CountryMap isoCode={isoCode} />
      </Col>
    </Row>
  );
}
