import { Container, Row, Col } from '@dataesr/react-dsfr';
import Parser from 'html-react-parser';
import { useOutletContext, useParams } from 'react-router-dom';

import groups from '../../../assets/data/groups.json';
import AdaptativeList from '../../../components/adaptative-list';
import CountryCard from '../../../components/country-card';
import TitleCurie from '../../../components/title';
import checkGeographicItems from '../../../utils/checkGeographicItems';
import checkPolicyItems from '../../../utils/checkPolicyItems';
import getLabel from '../../../utils/getLabel';

export default function SimilarCountriesPage() {
  const contextData = useOutletContext();
  const { isoCode } = useParams();

  const dataCountry = contextData['curiexplore-pays'].find((country) => country.fields.iso3 === isoCode);
  const dataIDH = contextData['curiexplore-donnees-quantitatives'];

  const idh = dataIDH.find((el) => el.fields.code === 'IDH')?.fields || null;
  const idhGroupCountries = dataCountry.fields.idh_group_countries?.split(',') || [];
  const borderCountries = dataCountry.fields.borders?.split(',') || [];

  return (
    <Container fluid spacing="mb-6w">
      <TitleCurie
        icon="ri-earth-line"
        title="Liste des pays voisins"
      />
      <Row gutters className="fr-mb-3w">
        {borderCountries.map((iso) => (
          <Col n="3" key={iso}>
            <CountryCard
              title={getLabel(iso)}
              isoCode={iso}
            />
          </Col>
        ))}
      </Row>
      {checkGeographicItems(dataCountry.fields).map((item) => (
        <>
          <TitleCurie
            icon="ri-earth-line"
            title={`Liste des pays/territoires membres de "${item.label}"`}
          />
          <Row className="fr-mb-3w">
            <Col n="12">
              {groups.find((el) => el.code === item.code).definition ? (
                <>
                  {Parser(groups.find((el) => el.code === item.code).definition)}
                </>
              ) : (
                ''
              )}
            </Col>
          </Row>
          <Row gutters className="fr-mb-3w">
            <AdaptativeList
              elements={contextData['curiexplore-pays']
                .filter((country) => country.fields[item.code] === 'True')
                .map((country) => (
                  <Col n="3">
                    <CountryCard
                      color={groups.find((el) => el.code === item.code).mapColor}
                      fillColor={groups.find((el) => el.code === item.code).mapFillColor}
                      isoCode={country.fields.iso3}
                      title={getLabel(country.fields.iso3)}
                    />
                  </Col>
                ))}
            />
          </Row>
        </>
      ))}
      {checkPolicyItems(dataCountry.fields).map((item) => (
        <>
          <TitleCurie
            icon="ri-earth-line"
            title={`Liste des pays/territoires membres de "${item.label}"`}
          />
          <Row className="fr-mb-3w">
            <Col n="12">
              {groups.find((el) => el.code === item.code).definition ? (
                <>
                  {Parser(groups.find((el) => el.code === item.code).definition)}
                </>
              ) : (
                ''
              )}
            </Col>
          </Row>
          <Row gutters className="fr-mb-3w">
            <AdaptativeList
              elements={contextData['curiexplore-pays']
                .filter((country) => country.fields[item.code] === 'True')
                .map((country) => (
                  <Col n="3">
                    <CountryCard
                      color={groups.find((el) => el.code === item.code).mapColor}
                      fillColor={groups.find((el) => el.code === item.code).mapFillColor}
                      isoCode={country.fields.iso3}
                      title={getLabel(country.fields.iso3)}
                    />
                  </Col>
                ))}
            />
          </Row>
        </>
      ))}
      {
        idh && (
          <>
            <TitleCurie
              icon="ri-earth-line"
              title="Liste des territoires ayant un indice de développement humain proche"
            />
            <Row className="fr-mb-3w">
              <Col n="12">
                {Parser(idh.definition)}
              </Col>
            </Row>
            <Row gutters className="fr-mb-3w">
              {idhGroupCountries.map((iso) => (
                <Col n="3" key={iso}>
                  <CountryCard
                    isoCode={iso}
                    title={getLabel(iso)}
                  />
                </Col>
              ))}
            </Row>
          </>
        )
      }
    </Container>
  );
}
