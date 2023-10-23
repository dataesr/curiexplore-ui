/* eslint-disable max-len */
import { Link as RouterLink } from 'react-router-dom';
import { Col, Container, Row, Text, Breadcrumb, BreadcrumbItem, Title } from '@dataesr/react-dsfr';

import logoMEAE from '../assets/img/logo-meae.svg';
import logoMESR from '../assets/img/logo-mesr.svg';
import { useTitle } from '../hooks/usePageTitle';

export default function MentionsLegalesPage() {
  useTitle('Curiexplore - Mentions légales');

  return (
    <Container>
      <Breadcrumb>
        <BreadcrumbItem asLink={<RouterLink to="/" />}>
          Accueil
        </BreadcrumbItem>
        <BreadcrumbItem>
          Mentions légales
        </BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col>
          <Title as="h1">
            Mentions Légales
          </Title>
        </Col>
      </Row>
      <Row>
        <Col n="12">
          <Text>
            Ce service est mis en place par :
          </Text>
        </Col>
      </Row>
      <Row className="fr-mb-3w">
        <Col n="12 md-8">
          <Text>
            <b>
              Le ministère de l'Europe et des Affaires étrangères
            </b>
            <br />
            Direction générale de la mondialisation, de la culture, de l'enseignement et du développement international
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
        <Col n="12 md-4">
          <img src={logoMEAE} className="fr-responsive-img" alt="Logo du Ministère de l'Europe et des Affaires étrangères" style={{ width: 200 }} aria-hidden />
        </Col>
      </Row>
      <Row className="fr-mb-3w">
        <Col n="12 md-8">
          <Text>
            <b>
              Le ministère de l'Enseignement supérieur et de la Recherche
            </b>
            <br />
            Direction générale de l'enseignement supérieur et de l'insertion professionnelle
            <br />
            Direction générale de la recherche et de l'innovation
            <br />
            Sous-direction des systèmes d'information et des études statistiques (SIES)
            <br />
            Département des outils d'aide à la décision
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
        <Col n="12 md-4">
          {/* TODO: LOGO MESR */}
          <img src={logoMESR} className="fr-responsive-img" alt="Logo du Ministère de l'Europe et des Affaires étrangères" aria-hidden />
        </Col>
      </Row>
      <Row>
        <Text>
          <b>
            Prestataire d’hébergement
          </b>
          <br />
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
      </Row>
    </Container>
  );
}
