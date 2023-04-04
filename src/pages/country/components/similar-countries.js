import { Container, Row, Col, Highlight } from '@dataesr/react-dsfr';
import { useOutletContext, useParams } from 'react-router-dom';
import Parser from 'html-react-parser';

import CountryCard from '../../../components/country-card';
import getLabel from '../../../utils/getLabel';
import TitleCurie from '../../../components/title';
import checkGeographicItems from '../../../utils/checkGeographicItems';
import checkPolicyItems from '../../../utils/checkPolicyItems';

export default function SimilarCountriesPage() {
  const contextData = useOutletContext();
  const { isoCode } = useParams();

  const dataCounrty = contextData['curiexplore-pays'].find((country) => country.fields.iso3 === isoCode);
  const dataIDH = contextData['curiexplore-donnees-quantitatives'];

  const idh = dataIDH.find((el) => el.fields.code === 'IDH').fields;
  const idhGroupCountries = dataCounrty.fields.idh_group_countries.split(',') || [];

  return (
    <Container fluid spacing="mb-6w">
      <Row>
        <Col>
          <TitleCurie
            icon="ri-earth-line"
            title="Liste des pays ayant un Indice de Développement Humain (IDH) proche"
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
      {checkGeographicItems(dataCounrty.fields).map((item) => (
        <>
          <Row className="fr-mt-2w">
            <Col>
              <TitleCurie
                icon="ri-earth-line"
                title={`Liste des pays membres de "${item.label}"`}
              />
            </Col>
          </Row>
          <Row gutters>
            {
              contextData['curiexplore-pays']
                .filter((country) => country.fields[item.code] === 'True')
                .map((country) => (
                  <Col n="3">
                    <CountryCard
                      title={getLabel(country.fields.iso3)}
                      isoCode={country.fields.iso3}
                    />
                  </Col>
                ))
            }
          </Row>
        </>
      ))}
      {checkPolicyItems(dataCounrty.fields).map((item) => (
        <>
          <Row className="fr-mt-2w">
            <Col>
              <TitleCurie
                icon="ri-earth-line"
                title={`Liste des pays membres de "${item.label}"`}
              />
            </Col>
          </Row>
          <Row gutters>
            {
              contextData['curiexplore-pays']
                .filter((country) => country.fields[item.code] === 'True')
                .map((country) => (
                  <Col n="3">
                    <CountryCard
                      title={getLabel(country.fields.iso3)}
                      isoCode={country.fields.iso3}
                    />
                  </Col>
                ))
            }
          </Row>
        </>
      ))}
    </Container>
  );
}
