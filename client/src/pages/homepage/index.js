import { Col, Container, Row, Title } from '@dataesr/react-dsfr';
import { useState } from 'react';
import { MapContainer } from 'react-leaflet';
import WorldMap from './components/world-map';
import RegionFilters from './components/region-filters';
import CountryList from './components/country-list';
import LastUpdated from './components/last-updated';
import { useTitle } from '../../hooks/usePageTitle';

export default function HomePage() {
  const [region, setRegion] = useState('world');
  useTitle('Accueil - Curiexplore');
  return (
    <>
      <Container fluid>
        <Row>
          <Col offset="2" n="8">
            <Title as="h1" look="h3" className="fr-m-4w home-title">
              La plateforme d'exploration des systèmes d'enseignement supérieur,
              de recherche et d'innovation à l'international
            </Title>
          </Col>
        </Row>
        <Row>
          <Col n="12">
            <div aria-hidden>
              <MapContainer
                zoomControl={false}
                scrollWheelZoom={false}
                attributionControl={false}
                center={[50, 10]}
                zoom={2}
                maxBounds={[[85, -180], [-85, 180]]}
                style={{
                  height: '710px',
                  backgroundColor: '#f6f6f6',
                  position: 'relative',
                }}
              >
                <WorldMap region={region} />
              </MapContainer>
            </div>
          </Col>
        </Row>
      </Container>
      <RegionFilters region={region} setRegion={setRegion} />
      <CountryList region={region} />
      <LastUpdated />
    </>

  );
}
