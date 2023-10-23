import PropTypes from 'prop-types';
import { Container, Col, Row, Text } from '@dataesr/react-dsfr';
import { useState } from 'react';

import AnnuaireBloc from '../../components/directory-blocs/annuaire-bloc';
import { useTitle } from '../../hooks/usePageTitle';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'y', 'z'];

function Filter({ selectedLetter, setSelectedLetterHandler }) {
  return (
    <Row gutters>
      <Col n="12" className="fr-mt-3w text-center">
        {letters.map((letter) => (
          <button
            key={`${letter}-key`}
            onClick={() => setSelectedLetterHandler(letter)}
            style={(letter === selectedLetter) ? { fontWeight: 'bold', textDecoration: 'underline' } : null}
            aria-current={(letter === selectedLetter)}
            type="button"
          >
            <Text>{letter}</Text>
          </button>
        ))}
      </Col>
    </Row>
  );
}
Filter.propTypes = {
  selectedLetter: PropTypes.string.isRequired,
  setSelectedLetterHandler: PropTypes.func.isRequired,
};

export default function DirectoryPage() {
  const [selectedLetter, setSelectedLetter] = useState('a');
  useTitle('Curiexplore - Annuaire');
  return (
    <Container as="section">
      <Filter selectedLetter={selectedLetter} setSelectedLetterHandler={() => setSelectedLetter()} />
      <AnnuaireBloc selectedLetter={selectedLetter} />
    </Container>
  );
}
