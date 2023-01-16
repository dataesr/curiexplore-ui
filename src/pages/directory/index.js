import React, { useState } from 'react';
import { Container, Col, Row, Text } from '@dataesr/react-dsfr';
import { v4 as uuidv4 } from 'uuid';
import AnnuaireBloc from '../../components/directory-blocs/annuaire-bloc';

export default function DirectoryPage() {
  const [selectedLetter, setSelectedLetter] = useState('a');
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  return (
    <Container>
      <Row gutters>
        <Col n="12">
          <p>Annuaire</p>
          <p>Trouver le bon contact dans chaque pays</p>
          <div>
            {
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
            }
          </div>
        </Col>
      </Row>
      <AnnuaireBloc selectedLetter={selectedLetter} />
    </Container>
  );
}
DirectoryPage.propTypes = {

};

DirectoryPage.defaultProps = {
  types: [],
  title: 'Liens web',
};
