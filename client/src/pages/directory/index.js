import React, { useState } from 'react';
import { Container, Col, Row, Text } from '@dataesr/react-dsfr';
import { v4 as uuidv4 } from 'uuid';
import AnnuaireBloc from '../../components/directory-blocs/annuaire-bloc';

export default function DirectoryPage() {
  const [selectedLetter, setSelectedLetter] = useState('a');
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'y', 'z'];

  const LettersBloc = () => (
    letters.map((currentLetter) => (
      <button
        key={uuidv4()}
        onClick={() => setSelectedLetter(currentLetter)}
        style={(currentLetter === selectedLetter) ? { fontWeight: 'bold', textDecoration: 'underline' } : null}
        type="button"
      >
        <Text>{currentLetter}</Text>
      </button>
    ))
  );

  return (
    <Container as="section">
      <Row gutters>
        <Col n="12" className="fr-mt-3w text-center">
          {LettersBloc()}
        </Col>
      </Row>
      <AnnuaireBloc selectedLetter={selectedLetter} />
      <Row gutters>
        <Col n="12" className="fr-mt-3w text-center">
          {LettersBloc()}
        </Col>
      </Row>
    </Container>
  );
}
