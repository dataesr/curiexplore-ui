import { useParams } from 'react-router-dom';
import { Row, Col } from '@dataesr/react-dsfr';
import { MapContainer } from 'react-leaflet';
import CountryMap from './country-map';
import { GraphContainer, GraphTitle } from '../../../components/graph';

export default function CountryProfilePage() {
  const { isoCode } = useParams();
  return (
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
      <Col n="12">
        <GraphContainer>
          <GraphTitle>
            Evolution du produit intérieur brut
          </GraphTitle>
        </GraphContainer>
      </Col>
    </Row>
  );
}
