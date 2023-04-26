import { Container, Row, Col, Highlight } from '@dataesr/react-dsfr';
import { useOutletContext, useParams } from 'react-router-dom';
import Parser from 'html-react-parser';

import CountryCard from '../../../components/country-card';
import getLabel from '../../../utils/getLabel';
import TitleCurie from '../../../components/title';
import checkGeographicItems from '../../../utils/checkGeographicItems';
import checkPolicyItems from '../../../utils/checkPolicyItems';
import AdaptativeList from '../../../components/adaptative-list';

import groups from '../../../assets/data/groups.json';

export default function SimilarCountriesPage() {
  const contextData = useOutletContext();
  const { isoCode } = useParams();

  const dataCountry = contextData['curiexplore-pays'].find((country) => country.fields.iso3 === isoCode);
  const dataIDH = contextData['curiexplore-donnees-quantitatives'];

  const idh = dataIDH.find((el) => el.fields.code === 'IDH').fields;
  const idhGroupCountries = dataCountry.fields.idh_group_countries.split(',') || [];
  const borderCountries = dataCountry.fields.borders.split(',') || [];

  return (
    <Container fluid spacing="mb-6w">
      <Row className="fr-mt-5w">
        <Col>
          <TitleCurie
            icon="ri-earth-line"
            title="Liste des pays voisins"
          />
        </Col>
      </Row>
      <Row gutters>
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
          <Row className="fr-mt-5w">
            <Col>
              <TitleCurie
                icon="ri-earth-line"
                title={`Liste des pays/territoires membres de "${item.label}"`}
              />
            </Col>
          </Row>
          <Row className="fr-mt-2w">
            <Col n="12">
              {groups.find((el) => el.code === item.code).definition ? (
                <Highlight colorFamily="yellow-tournesol" className="fr-pt-1w">
                  {Parser(groups.find((el) => el.code === item.code).definition)}
                </Highlight>
              ) : (
                ''
              )}
              {/* {Parser(groups.find((el) => el.code === item.code).definition)} */}
            </Col>
          </Row>
          <Row gutters>
            <AdaptativeList
              elements={contextData['curiexplore-pays']
                .filter((country) => country.fields[item.code] === 'True')
                .map((country) => (
                  <Col n="3">
                    <CountryCard
                      title={getLabel(country.fields.iso3)}
                      isoCode={country.fields.iso3}
                      color={groups.find((el) => el.code === item.code).mapColor}
                      fillColor={groups.find((el) => el.code === item.code).mapFillColor}
                    />
                  </Col>
                ))}
            />
          </Row>
        </>
      ))}
      {checkPolicyItems(dataCountry.fields).map((item) => (
        <>
          <Row className="fr-mt-5w">
            <Col>
              <TitleCurie
                icon="ri-earth-line"
                title={`Liste des pays/territoires membres de "${item.label}"`}
              />
            </Col>
          </Row>
          <Row className="fr-mt-2w">
            <Col n="12">
              {groups.find((el) => el.code === item.code).definition ? (
                <Highlight colorFamily="yellow-tournesol" className="fr-pt-1w">
                  {Parser(groups.find((el) => el.code === item.code).definition)}
                </Highlight>
              ) : (
                ''
              )}
            </Col>
          </Row>
          <Row gutters>
            <AdaptativeList
              elements={contextData['curiexplore-pays']
                .filter((country) => country.fields[item.code] === 'True')
                .map((country) => (
                  <Col n="3">
                    <CountryCard
                      title={getLabel(country.fields.iso3)}
                      isoCode={country.fields.iso3}
                      color={groups.find((el) => el.code === item.code).mapColor}
                      fillColor={groups.find((el) => el.code === item.code).mapFillColor}
                    />
                  </Col>
                ))}
            />

          </Row>
        </>
      ))}
      <Row>
        <Col>
          <TitleCurie
            icon="ri-earth-line"
            title="Liste des pays/territoires ayant un Indice de Développement Humain proche"
            subTitle={idh.date_et_origine_moissonnage}
          />
        </Col>
      </Row>
      <Row className="fr-mt-2w">
        <Col n="12">
          <Highlight colorFamily="yellow-tournesol" className="fr-pt-1w">
            {Parser(idh.definition)}
          </Highlight>
        </Col>
      </Row>
      <Row gutters>
        {idhGroupCountries.map((iso) => (
          <Col n="3" key={iso}>
            <CountryCard
              title={getLabel(iso)}
              isoCode={iso}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
