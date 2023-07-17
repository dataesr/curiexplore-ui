import React, { useState } from 'react';
import { Col, Row, Text, Container, Button } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import worldGeoJSON from '../../../assets/data/custom.geo.json';

const groupByLetters = (arr) => arr.reduce((acc, cur) => {
  const firstLetter = cur.name_fr?.[0]?.toLowerCase();
  if (firstLetter) return { ...acc, [firstLetter]: [...(acc[firstLetter] || []), cur] };
  return { ...acc };
}, {});

export default function CountryList({ region }) {
  const filteredCountries = worldGeoJSON.features
    .filter((el) => {
      if (el.properties.curiexplore === false) return false;
      if (region === 'world') return true;
      return el.properties.region_wb === region;
    })
    .map((el) => ({ name_fr: el.properties.name_fr, iso: el.properties.iso_a3 }));

  const byLettersCountries = groupByLetters(filteredCountries);
  const orderedCountries = Object.entries(byLettersCountries).sort(([a], [b]) => a.localeCompare(b));

  const [showAllCountries, setShowAllCountries] = useState(false);
  const [showABCDCountries, setShowABCDCountries] = useState(false);

  let countriesToShow = orderedCountries;

  if (!showAllCountries) {
    countriesToShow = countriesToShow.filter(([letter]) => letter.toLowerCase().match(/[abcd]/));
  } else if (showABCDCountries) {
    countriesToShow = countriesToShow.filter(([letter]) => letter.toLowerCase().match(/[abcd]/));
  }

  return (
    <Container>
      <Row gutters spacing="mb-6w">
        {countriesToShow.map(([letter, countries]) => (
          <Col n="3" key={letter}>
            <Text className="fr-mb-1v" size="lead" bold>
              {letter.toUpperCase()}
            </Text>
            <hr />
            {countries.map((country) => (
              <Row key={country.iso}>
                <Link to={`/pays/${country.iso}`}>{country.name_fr}</Link>
              </Row>
            ))}
          </Col>
        ))}
        {!showAllCountries && (
          <Col n="12">
            <Button secondary type="button" onClick={() => setShowAllCountries(true)}>
              Voir tous les pays
            </Button>
          </Col>
        )}
        {showAllCountries && !showABCDCountries && (
          <Col n="12">
            <Button secondary type="button" onClick={() => setShowABCDCountries(true)}>
              Afficher moins
            </Button>
          </Col>
        )}
        {showAllCountries && showABCDCountries && (
          <Col n="12">
            <Button secondary type="button" onClick={() => setShowABCDCountries(false)}>
              Voir tous les pays
            </Button>
          </Col>
        )}
      </Row>
    </Container>
  );
}

CountryList.defaultProps = {
  region: null,
};

CountryList.propTypes = {
  region: PropTypes.string,
};
