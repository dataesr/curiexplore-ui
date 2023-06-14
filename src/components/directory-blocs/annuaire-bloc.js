import {
  Col,
  Container,
  Link,
  Row,
  Title,
} from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import StructureCard from './structure-card';

import useFetchData from '../../pages/directory/hooks/useFetchData';
import useFetchDataCountries from '../../pages/directory/hooks/useFetchDataCountry';
import MapWithMarkers from '../map-with-markers';

function AnnuaireBloc({ selectedLetter }) {
  const { data } = useFetchData();
  const { dataCountries } = useFetchDataCountries();
  let filteredData = [];
  if (dataCountries && dataCountries['curiexplore-pays']?.length > 0) {
    filteredData = dataCountries['curiexplore-pays']
      .filter((country) => country.fields.name_fr.charAt(0).toLowerCase() === selectedLetter);
  }

  if (filteredData.length === 0 || data.length === 0) { return 'Loading ...'; }

  const getObjAddress = (el, idCat) => {
    if (el.currentLocalisation?.geometry?.coordinates?.length === 2) {
      return ({
        id: idCat,
        gps: el.currentLocalisation.geometry.coordinates,
        label: el.currentName,
        iconColor: el.curieCategories[0],
        iso3: el.iso3,
      });
    }
    return null;
  };

  // creation des listes d'adresses pour les markers de la carte avec une couleur associée
  const addressesList = data?.embassy?.map((el) => (getObjAddress(el, 'embassy')))
    .concat(data?.campusFrance?.map((el) => (getObjAddress(el, 'campusFrance')))
      .concat(data?.CCI?.map((el) => (getObjAddress(el, 'cci')))));

  return (
    <Container>
      {filteredData.map((el) => (
        <Container fluid spacing="mb-6w" key={uuidv4()} as="section">
          {(el.fields.iso3.length <= 3 && (
            data?.embassy?.filter((item) => (item.currentLocalisation.iso3 === el.fields.iso3)).length > 0
            || data?.CCI?.filter((item) => (item.currentLocalisation.iso3 === el.fields.iso3)).length > 0
            || data?.campusFrance?.filter((item) => (item.currentLocalisation.iso3 === el.fields.iso3)).length > 0
          ))
            ? (
              <>
                <Row alignItems="middle" className="fr-pb-1w">
                  <Link href={`../pays/${el.fields.iso3}`}>
                    <Title as="h2" className="d-inline">
                      {`${el.fields.name_fr} (${el.fields.name_native})`}
                    </Title>
                    <img alt="Drapeau" className="fr-ml-2w" src={el.fields.flag} height="40px" />
                  </Link>
                </Row>
                <Row gutters>
                  <Col n="12 md-6">
                    <MapWithMarkers
                      data={addressesList.filter((item) => item !== null && item.iso3 === el.fields.iso3)}
                      style={{ height: '430px' }}
                    />
                  </Col>
                  <Col n="12 md-6">
                    <Row gutters>
                      {(data?.embassy?.filter((item) => (item.iso3 === el.fields.iso3)).length > 0) ? (
                        <Col n="12">
                          <StructureCard
                            data={data?.embassy?.filter((item) => (item.iso3 === el.fields.iso3))}
                            type="embassy"
                            website={el.fields.website}
                          />
                        </Col>
                      ) : null}

                      {(data?.campusFrance?.filter((item) => (item.iso3 === el.fields.iso3)).length > 0) ? (
                        <Col n="12">
                          <StructureCard
                            data={data?.campusFrance?.filter((item) => (item.iso3 === el.fields.iso3))}
                            type="campusFrance"
                            website={data?.campusFrance?.filter((item) => (item.iso3 === el.fields.iso3))[0]?.websites[0]?.url}
                          />
                        </Col>
                      ) : null}

                      {(data?.CCI?.filter((item) => (item.iso3 === el.fields.iso3)).length > 0) ? (
                        <Col n="12">
                          <StructureCard
                            data={data?.CCI?.filter((item) => (item.iso3 === el.fields.iso3))}
                            type="cci"
                            website={data?.CCI?.filter((item) => (item.iso3 === el.fields.iso3))[0]?.websites[0]?.url}
                          />
                        </Col>
                      ) : null}
                    </Row>
                  </Col>
                </Row>
              </>
            ) : null}
        </Container>
      ))}
    </Container>
  );
}

export default AnnuaireBloc;

AnnuaireBloc.propTypes = {
  selectedLetter: PropTypes.string.isRequired,
};
