import { Col, Row, Text } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import worldGeoJSON from '../../../assets/data/custom.geo.json';

const groupByLetters = (arr) => arr.reduce((acc, cur) => {
  const firstLetter = cur.name?.[0]?.toLowerCase();
  if (firstLetter) return { ...acc, [firstLetter]: [...(acc[firstLetter] || []), cur] };
  return { ...acc };
}, {});

export default function CountryList({ region }) {
  const filteredCountries = worldGeoJSON.features
    .filter((el) => {
      if (el.properties.iso_a3 === 'FRA') return false;
      if (region === 'world') return true;
      return (el.properties.region_wb === region);
    })
    .map((el) => ({ name: el.properties.name, iso: el.properties.iso_a3 }));
  const byLettersCountries = groupByLetters(filteredCountries);
  const orderedCountries = Object.entries(byLettersCountries).sort(([a], [b]) => a.localeCompare(b));
  return (
    <Row gutters spacing="mb-6w">
      {orderedCountries.map(([letter, countries]) => (
        <Col n="3" key={letter}>
          <Text className="fr-mb-1v" size="lead" bold>{letter.toUpperCase()}</Text>
          <hr />
          {countries.map((country) => (
            <Row>
              <Link to={`/pays/${country.iso}`}>{country.name}</Link>
            </Row>
          ))}
        </Col>
      ))}
    </Row>
  );
}
CountryList.defaultProps = {
  region: null,
};

CountryList.propTypes = {
  region: PropTypes.string,
};
