import { Container, Row, Col, Title, Icon, Highlight } from '@dataesr/react-dsfr';
import { useOutletContext } from 'react-router-dom';
import Parser from 'html-react-parser';

import CountryCard from '../../../components/country-card';
import getLabel from '../../../utils/getLabel';
import TitleCurie from '../../../components/title';

export default function SimilarCountriesPage() {
  const contextData = useOutletContext();
  const dataCounrty = contextData['curiexplore-pays'];
  const dataIDH = contextData['curiexplore-donnees-quantitatives'];

  const idh = dataIDH.find((el) => el.fields.code === 'IDH').fields;
  const idhGroupCountries = dataCounrty[0].fields.idh_group_countries.split(',') || [];

  return (
    <Container fluid spacing="mb-6w">
      <Row>
        <Col n="12">
          <Title as="h3" look="h4">
            {idh.label}
          </Title>
          <Highlight colorFamily="yellow-tournesol" className="fr-pt-1w">
            {Parser(idh.definition)}
          </Highlight>
        </Col>
      </Row>
      <Row>
        <Col>
          <TitleCurie
            icon="ri-earth-line"
            title="Liste des pays ayant un Indice de Développement Humain (IDH) proche"
            subTitle={idh.date_et_origine_moissonnage}
          />
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
