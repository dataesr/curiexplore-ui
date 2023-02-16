import { Container, Col, Row } from '@dataesr/react-dsfr';
import { MapContainer } from 'react-leaflet';
import { useParams } from 'react-router-dom';

import CountryMap from '../../../../components/country-map';
import ChartComponents from '../chart-components';

import charts from './charts.json';

export default function CountryProfilePage() {
  const { isoCode } = useParams();

  return (
    <Container>
      <Row gutters>
        <Col n="12">
          <MapContainer
            zoomControl={false}
            scrollWheelZoom={false}
            attributionControl={false}
            style={{
              height: '400px',
              backgroundColor: '#FFCA00',
              position: 'relative',
            }}
          >
            <CountryMap isoCode={isoCode} />
          </MapContainer>
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
