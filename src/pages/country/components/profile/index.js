import { Container, Col, Row, Title } from '@dataesr/react-dsfr';
import { MapContainer } from 'react-leaflet';
import { useParams, useOutletContext } from 'react-router-dom';

import CountryMap from '../../../../components/country-map';
import ChartComponents from '../chart-components';

import charts from './charts.json';
import PopulationComponent from '../chart-components/population';
import IDHCard from '../../../../components/idh-card';
import PopulationCard from '../../../../components/population-card';

export default function CountryProfilePage() {
  const { isoCode } = useParams();
  const contextData = useOutletContext();
  const dataIDH = contextData['curiexplore-donnees-quantitatives'];

  // Revenu national brut par habitant
  const RNB = { ...dataIDH.find((el) => el.fields.code === 'RNB').fields };

  // Indice de développement humain
  const IDH = { ...dataIDH.find((el) => el.fields.code === 'IDH').fields };

  // Espérance de vie à la naissance
  const ESPVIE = { ...dataIDH.find((el) => el.fields.code === 'ESPVIE').fields };

  const getDescription = (code) => {
    if (code.code === 'RNB') {
      return (
        <Title as="h3">{`${Math.floor(code.value)} ${code.unit}`}</Title>
      );
    }
    if (code.code === 'IDH') {
      return (
        <Title as="h3">{code.value}</Title>
      );
    }
    if (code.code === 'ESPVIE') {
      return (
        <Title as="h3">{`${code.value.toFixed(1)} ${code.unit}`}</Title>
      );
    }
    return null;
  };

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
      <Row gutters>
        <Col n="4">
          <PopulationCard
            badgeLabel={RNB.year}
            description={getDescription(RNB)}
            title={RNB.label}
          />
        </Col>
        <Col n="4">
          <PopulationCard
            badgeLabel={IDH.year}
            description={getDescription(IDH)}
            title={IDH.label}
          />
        </Col>
        <Col n="4">
          <PopulationCard
            badgeLabel={ESPVIE.year}
            description={getDescription(ESPVIE)}
            title={ESPVIE.label}
          />
        </Col>
      </Row>
      <Row>
        <Col n="12">
          <ChartComponents charts={charts.filter((chart) => chart.type.split('-')[0] !== 'custom')} />
        </Col>
      </Row>
    </Container>
  );
}
