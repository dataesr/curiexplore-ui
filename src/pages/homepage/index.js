import { Col, Container, Row } from '@dataesr/react-dsfr';
import { useState } from 'react';
import { MapContainer } from 'react-leaflet';
import WorldMap from './components/world-map';
import RegionFilters from './components/region-filters';
import CountryList from './components/country-list';
import LastUpdated from './components/last-updated';

export default function HomePage() {
  const [region, setRegion] = useState('world');
  return (
    <>
      <Container fluid>
        <Row gutters>
          <Col n="12">
            <MapContainer
              zoomControl={false}
              scrollWheelZoom={false}
              attributionControl={false}
              center={[50, 10]}
              zoom={2}
              maxBounds={[[85, -180], [-85, 180]]}
              style={{
                height: '710px',
                backgroundColor: '#FFCA00',
                position: 'relative',
              }}
            >
              <WorldMap region={region} />
            </MapContainer>
          </Col>
        </Row>
      </Container>
      <Container>
        <RegionFilters region={region} setRegion={setRegion} />
      </Container>
      <Container>
        <CountryList region={region} />
      </Container>
      <Container>
        <LastUpdated />
      </Container>
    </>

  );
}
