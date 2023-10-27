import { Col, Row } from '@dataesr/react-dsfr';
import { MapContainer } from 'react-leaflet';
import { useParams, useOutletContext } from 'react-router-dom';

import Title from '../../../../components/title';
import CountryMap from '../../../../components/country-map';
import ChartComponents from '../chart-components';

import charts from './charts.json';
import PopulationComponent from '../chart-components/population';
import GenericCard from '../../../../components/generic-card';
import IDHComparisonChart from '../../../../components/idh-chart';

export default function CountryProfilePage() {
  const { isoCode } = useParams();
  const contextData = useOutletContext();
  const dataCountry = contextData['curiexplore-pays'].find(
    (country) => country.fields.iso3 === isoCode,
  );
  const dataIDH = contextData['curiexplore-donnees-quantitatives'];

  // Revenu national brut par habitant
  const RNB = { ...dataIDH.find((el) => el.fields.code === 'RNB')?.fields };

  // Indice de développement humain
  const IDH = { ...dataIDH.find((el) => el.fields.code === 'IDH')?.fields };

  // Espérance de vie à la naissance
  const ESPVIE = {
    ...dataIDH.find((el) => el.fields.code === 'ESPVIE')?.fields,
  };

  const getNumber = (code) => {
    if (code.code === 'RNB') {
      return (
        <p className="text-center fr-mb-0 is-bold extra-large-text">
          {Math.floor(code.value).toLocaleString()}
          {' '}
          {code.unit}
        </p>
      );
    }
    if (code.code === 'IDH') {
      return (
        <p className="text-center fr-mb-0 is-bold extra-large-text">
          {code.value}
          {' '}
          {code.unit}
        </p>
      );
    }
    if (code.code === 'ESPVIE') {
      return (
        <p className="text-center fr-mb-0 is-bold extra-large-text">
          {code.value.toFixed(1)}
          {' '}
          {code.unit}
        </p>
      );
    }
    return null;
  };

  return (
    <>
      <Row gutters className="fr-mb-1w">
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
      <Title as="h2" title="En un clin d'oeil" icon="ri-search-eye-line" />
      <Row gutters className="fr-mb-3w">
        {charts
          .filter(
            (chart) => chart.type.split('-')[0] === 'custom'
              && chart.type.split('-')[0] !== 'population',
          )
          .map((el) => (
            <PopulationComponent isoCode={isoCode} data={el} key={isoCode} />
          ))}
        {Object.keys(RNB).length !== 0 ? (
          <Col n="12 md-4">
            <GenericCard
              badgeLabel={RNB.year}
              indicator={getNumber(RNB)}
              description={RNB.label}
            />
          </Col>
        ) : null}
        {Object.keys(IDH).length !== 0 ? (
          <Col n="12 md-4">
            <GenericCard
              badgeLabel={IDH.year}
              indicator={getNumber(IDH)}
              description={IDH.label}
            />
          </Col>
        ) : null}
        {Object.keys(ESPVIE).length !== 0 ? (
          <Col n="12 md-4">
            <GenericCard
              badgeLabel={ESPVIE.year}
              indicator={getNumber(ESPVIE)}
              description={ESPVIE.label}
            />
          </Col>
        ) : null}
      </Row>
      {Object.keys(IDH).length !== 0 ? (
        <Row>
          <Col n="12">
            <IDHComparisonChart
              group={dataCountry.fields.idh_group}
              flagUrl={dataCountry.fields.flag}
              idhCountry={IDH.value}
              idhAverage={0.732}
              nameFr={dataCountry.fields.name_fr}
            />
          </Col>
        </Row>
      ) : null}
      <Row>
        <Col n="12">
          <ChartComponents
            charts={charts.filter(
              (chart) => chart.type.split('-')[0] !== 'custom',
            )}
          />
        </Col>
      </Row>
    </>
  );
}
