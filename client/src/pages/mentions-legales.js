/* eslint-disable max-len */
import { Link as RouterLink } from 'react-router-dom';
import {
  Col,
  Container,
  Row,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  Title,
} from '@dataesr/react-dsfr';

import { useTitle } from '../hooks/usePageTitle';

export default function MentionsLegalesPage() {
  useTitle('Mentions légales - Curiexplore');

  return (
    <Container>
      <Breadcrumb>
        <BreadcrumbItem asLink={<RouterLink to="/" />}>Accueil</BreadcrumbItem>
        <BreadcrumbItem>Mentions légales</BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col>
          <Title as="h1">Mentions Légales</Title>
        </Col>
      </Row>
      <Row>
        <Col n="12">
          <Text>Ce service est mis en place par :</Text>
        </Col>
      </Row>
      <Row className="fr-mb-3w">
        <Col n="12 md-8">
          <Title as="h2" look="h6">
            Le ministère de l'Europe et des Affaires étrangères
          </Title>
          <Text>
            Direction générale de la mondialisation, de la culture, de
            l'enseignement et du développement international
            <br />
            Sous-direction de l'Enseignement supérieur et de la Recherche
            <br />
          </Text>
          <Text>
            <b>
              27, rue de la Convention
              <br />
              75015 Paris
            </b>
          </Text>
        </Col>
      </Row>
      <Row className="fr-mb-3w">
        <Col n="12 md-8">
          <Title as="h2" look="h6">
            Le ministère chargé de l'Enseignement supérieur et de la Recherche
          </Title>
          <Text>
            Direction générale de l'enseignement supérieur et de l'insertion
            professionnelle
            <br />
            Direction générale de la recherche et de l'innovation
            <br />
            Sous-direction des systèmes d'information et des études statistiques
            (SIES)
            <br />
            Département ingénierie et science des données
            <br />
          </Text>
          <Text>
            <b>
              1 rue Descartes
              <br />
              75231 Paris cedex 05
            </b>
          </Text>
        </Col>
      </Row>
      <Row>
        <Col n="12 md-8">
          <Title as="h2" look="h6">
            Hébergement
          </Title>
          <Text>
            OVH
            <br />
            RCS Roubaix – Tourcoing 424 761 419 00045
            <br />
            Code APE 6202A
            <br />
            N° TVA : FR 22 424 761 419
            <br />
            Siège social : 2 rue Kellermann - 59100 Roubaix - France.
          </Text>
        </Col>
      </Row>
    </Container>
  );
}
