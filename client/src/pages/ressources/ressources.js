/* eslint-disable max-len */
import { Link as RouterLink } from 'react-router-dom';
import { Col, Container, Row, Title, Breadcrumb, BreadcrumbItem } from '@dataesr/react-dsfr';

import RessourceTile from '../country/components/country-links/components/tile';
import ressources from './ressources.json';

const mappings = {
  referentiel: {
    pictogram: 'document/document.svg',
    badge: 'referentiel',
    colorFamily: 'green-emeraude',
  },
  source: {
    pictogram: 'document/document.svg',
    badge: 'source',
    colorFamily: 'purple-glycine',
  },
};

export default function RessourcesPage() {
  return (
    <Container className="fr-mb-3w">
      <Breadcrumb>
        <BreadcrumbItem asLink={<RouterLink to="/" />}>
          Accueil
        </BreadcrumbItem>
        <BreadcrumbItem>
          Ressources mobilisées
        </BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col>
          <Title as="h1">
            Ressources mobilisées
          </Title>
        </Col>
      </Row>
      <Row gutters>
        {ressources.map((link) => (
          <Col n="12" key={link?.website}>
            <RessourceTile
              title={link?.label}
              href={link?.website}
              badge={link?.badge}
              description={link?.description}
              {...mappings[link?.badge]}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
