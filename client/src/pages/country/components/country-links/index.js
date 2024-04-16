import { useParams } from 'react-router-dom';
import { Col, Container, Row, Text, Icon } from '@dataesr/react-dsfr';
import useFetchData from './hooks/useFetchData';

import RessourceTile from './components/tile';
import { useTitle } from '../../../../hooks/usePageTitle';

const mappings = {
  openData: {
    pictogram: 'digital/data-visualization.svg',
    badge: 'Open Data',
    colorFamily: 'green-emeraude',
  },
  rapport: {
    pictogram: 'document/document.svg',
    badge: 'Rapport',
    colorFamily: 'yellow-tournesol',
  },
  servicesNumeriques: {
    pictogram: 'digital/internet.svg',
    badge: 'Services numériques',
    colorFamily: 'purple-glycine',
  },
};

export default function CountryLinksPages() {
  const { isoCode } = useParams();
  const { data, isLoading } = useFetchData({ isoCode });
  useTitle('Liens utiles - Curiexplore');

  if (isLoading) {
    return <div>Chargement en cours ...</div>;
  }

  if (!data || data.records.length === 0) {
    return <div> - Pas de lien pour ce pays -</div>;
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <Text>
            <Icon name="ri-error-warning-line" color="var(--border-default-blue-ecume)" />
            Certains des éléments ci-dessous peuvent être dans la langue d'origine.
          </Text>
        </Col>

      </Row>
      <Row gutters>
        {data.records.map((link) => (
          <Col n="12" key={link.fields.url}>
            <RessourceTile
              title={link.fields.nom}
              href={link.fields.url}
              description={link.fields.admin}
              date={link.fields.submitdateclean}
              {...mappings[link.fields.table]}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
