import {
  Col,
  Container,
  Row,
  Title,
} from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';
import { MapContainer } from 'react-leaflet';
import { v4 as uuidv4 } from 'uuid';

import StructureCard from './structure-card';

import useFetchData from '../../pages/directory/hooks/useFetchData';
import useFetchDataCountries from '../../pages/directory/hooks/useFetchDataCountry';
import CountryMap from '../country-map';

function AnnuaireBloc({ selectedLetter }) {
  const { data, isLoading } = useFetchData();
  const { dataCountries } = useFetchDataCountries();
  if (isLoading) { return 'Loading'; }

  let filteredData = [];
  if (dataCountries && dataCountries['curiexplore-pays']?.length > 0) {
    filteredData = dataCountries['curiexplore-pays'].filter((country) => country.fields.name_fr.charAt(0).toLowerCase() === selectedLetter);
  }
  console.log('filteredData', filteredData);

  return (
    <Container>
      {filteredData.map((el) => (
        <Container fluid spacing="mb-6w" key={uuidv4()}>
          {el.fields.iso3.length <= 3 ? (
            <>
              <Row alignItems="middle">
                <Title spacing="mb-1v" as="h2">
                  {el.fields.name_fr}
                  {' '}
                  (
                  {el.fields.name_native}
                  )
                </Title>
                <img alt="Drapeau" className="fr-ml-2w" src={el.fields.flag} height="40px" />
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
                    <CountryMap
                      isoCode={el.fields.iso3}
                      markers={[{ lat: el.geometry.coordinates[0], lng: el.geometry.coordinates[1] }]}

                    />
                  </MapContainer>
                </Col>
                <Col n="12 md-6">
                  <Row gutters>
                    {data.embassy.filter((item) => (item.currentLocalisation.iso3 === el.fields.iso3)).map(({ currentLocalisation }) => (
                      <Col n="6">
                        <StructureCard
                          address={currentLocalisation.address}
                          city={currentLocalisation.city}
                          country={currentLocalisation.country}
                          key={uuidv4()}
                          link={currentLocalisation.link}
                          phoneNumber={currentLocalisation.telephone}
                          postalCode={currentLocalisation.postalCode}
                          type="embassy"
                          website={el.fields.website}
                        />
                      </Col>
                    ))}
                    {data.campusFrance.filter((item) => (item.currentLocalisation.iso3 === el.fields.iso3)).map(({ currentLocalisation }) => (
                      <Col n="6">
                        <StructureCard
                          address={currentLocalisation.address}
                          city={currentLocalisation.city}
                          country={currentLocalisation.country}
                          key={uuidv4()}
                          link={currentLocalisation.link}
                          phoneNumber={currentLocalisation.telephone}
                          postalCode={currentLocalisation.postalCode}
                          type="campusFrance"
                          website={el.fields.website}
                        />
                      </Col>
                    ))}
                    {data.CCI.filter((item) => (item.currentLocalisation.iso3 === el.fields.iso3)).map(({ currentLocalisation }) => (
                      <Col n="6">
                        <StructureCard
                          address={currentLocalisation.address}
                          city={currentLocalisation.city}
                          country={currentLocalisation.country}
                          key={uuidv4()}
                          link={currentLocalisation.link}
                          phoneNumber={currentLocalisation.telephone}
                          postalCode={currentLocalisation.postalCode}
                          type="cci"
                          website={el.fields.website}
                        />
                      </Col>
                    ))}
                  </Row>
                  {/* <EmbassyBloc website={el.fields.website} data={data.embassy.filter((item) => (item.currentLocalisation.iso3 === el.fields.iso3))} /> */}
                </Col>
                {/*
                <Col n="12" spacing="n-6w">
                  <CCI website={el.fields.website} data={data.CCI.filter((item) => (item.currentLocalisation.iso3 === el.fields.iso3))} />
                </Col>
                <Col n="12" spacing="n-6w">
                  <CampusFrance website={el.fields.website} data={data.campusFrance.filter((item) => (item.currentLocalisation.iso3 === el.fields.iso3))} />
                </Col> */}
              </Row>
            </>
          ) : null }

        </Container>
      ))}
    </Container>
  );
}

export default AnnuaireBloc;

AnnuaireBloc.propTypes = {
  selectedLetter: PropTypes.string.isRequired,
};
