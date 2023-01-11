import React, { useState } from 'react';
import { Container, Col, Row } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';
import AnnuaireBloc from '../../components/directory-blocs/annuaire-bloc';
import useFetchDataCountries from './hooks/useFetchDataCountry';

export default function DirectoryPage() {
  const { dataCountries, isLoading, isError } = useFetchDataCountries();
  const [selectedLetter, setSelectedLetter] = useState('a');
  const [searchLetters, setSearchLetters] = useState('');
  const searched = searchLetters || selectedLetter;

  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const fields = (dataCountries && dataCountries.records && dataCountries.records.length > 0)
    ? dataCountries.records[0].fields : null;

  if (isLoading) return ('Loading');
  if (isError) return null;

  return (
    <Container>
      <Row gutters>
        <Col n="12">
          <p>Annuaire</p>
          {/* <p>{(fields && fields.submitdate) ? `Fiche mise à jour en ${fields.submitdate}` : 'Annuaire non mise à jour'}</p> */}
          <p>Trouver le bon contact dans chaque pays</p>
          <div>
            {
              letters.map((currentLetter) => (
                <button
                  style={(currentLetter === selectedLetter) ? { color: 'white', fontWeight: 'bold', textDecoration: 'underline' } : null}
                  type="button"
                  onClick={() => setSelectedLetter(currentLetter)}
                >
                  {currentLetter}
                </button>
              ))
            }
          </div>
          <div className="pb-2">
            <text className="white ml-1">
              <a href="./files/annuaire/CurieXplore-annuaire_des_contacts.docx" className="skyBlue-link">
                Télécharger tous les contacts
              </a>
            </text>
          </div>
        </Col>
        <Col>
          <div>
            <text className="font-style-italic">Chercher un pays</text>
            <input id="search" onChange={(e) => setSearchLetters(e.target.value)} />
            {
              (searchLetters) ? (
                <div className="p-2 mt-2 blue-bg d-inline-block rounded-pill">
                  <span className="white">
                    {searchLetters}
                  </span>
                </div>
              ) : null
            }
          </div>
        </Col>
      </Row>
      <AnnuaireBloc />
    </Container>
  );
}
DirectoryPage.propTypes = {

};

DirectoryPage.defaultProps = {
  types: [],
  title: 'Liens web',
};
