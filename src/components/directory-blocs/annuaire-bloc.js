import { Row, Col, Container } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';
import { MapContainer } from 'react-leaflet';
import EmbassyBloc from './embassy-bloc';
import CampusFrance from './campus-france';
import CCI from './cci';
import useFetchData from '../../pages/directory/hooks/useFetchData';
import useFetchDataCountries from '../../pages/directory/hooks/useFetchDataCountry';
// import CountryMap from '../country-map';

function AnnuaireBloc() {
  const { data, isLoading } = useFetchData();
  const { dataCountries } = useFetchDataCountries();
  if (isLoading) { return 'Loading'; }

  return (
    <Container>
      {dataCountries['curiexplore-pays']?.map((el) => (
        <Container fluid spacing="mb-6w">
          {el.fields.iso3.length <= 3 ? (
            <>
              <Row>
                <div>
                  <h2>{el.fields.name_fr}</h2>
                  <img className="flag" src={el.fields.flag} alt="flag" />
                </div>
              </Row>
              <Row gutters>
                <Col n="12 md-6">
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
                    {/* <CountryMap
                      isoCode={el.currentLocalisation.iso3}
                      markers={[lat: el.geometry.coordinates[0], lng: el.geometry.coordinates[1], color:'red']}

                    // /> */}
                  </MapContainer>
                </Col>
                <Col n="12 md-6">
                  <Row gutters>
                    <Col n="12">
                      <EmbassyBloc website={el.fields.website} data={data.embassy.filter((item) => (item.currentLocalisation.iso3 === el.fields.iso3))} />
                    </Col>
                  </Row>
                </Col>
                <Col n="12" spacing="n-6w">
                  <CCI website={el.fields.website} data={data.CCI.filter((item) => (item.currentLocalisation.iso3 === el.fields.iso3))} />
                </Col>
                <Col n="12" spacing="n-6w">
                  <CampusFrance website={el.fields.website} data={data.campusFrance.filter((item) => (item.currentLocalisation.iso3 === el.fields.iso3))} />
                </Col>
              </Row>
            </>
          ) : null }

        </Container>
      ))}
    </Container>
  );
}

export default AnnuaireBloc;

CampusFrance.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
};
CampusFrance.defaultProps = {
  data: PropTypes.array,
};
