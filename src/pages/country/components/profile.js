import { useOutletContext } from 'react-router-dom';
import { Row, Col } from '@dataesr/react-dsfr';
import CountryMap from '../../../components/country-map';

export default function CountryProfilePage() {
  const data = useOutletContext();
  return (
    <Row>
      <Col n="12">
        <CountryMap isoCode={data.isoCode} />
      </Col>
    </Row>
  );
}
