import { Container, Col, Row } from '@dataesr/react-dsfr';
import { MapContainer } from 'react-leaflet';
import { useParams } from 'react-router-dom';

import CountryMap from '../../../../components/country-map';
import ChartComponents from '../chart-components';

import charts from './charts.json';
import PopulationComponent from '../chart-components/population';

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
      <Row gutters>
        {
          charts.filter((chart) => chart.type.split('-')[0] === 'custom'
            && chart.type.split('-')[0] !== 'population')
            .map((el) => (
              <Col n="4">
                <PopulationComponent isoCode={isoCode} data={el} />
              </Col>
            ))
        }
      </Row>
      <Row>
        <Col n="12">
          <ChartComponents charts={charts.filter((chart) => chart.type.split('-')[0] !== 'custom')} />
        </Col>
      </Row>
    </Container>
  );
}
