/* eslint-disable max-len */
import { Link as RouterLink } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row, Text, Title } from '@dataesr/react-dsfr';

import image1 from '../assets/img/human-cooperation.svg';
import { useTitle } from '../hooks/usePageTitle';

export default function ProjetEtEquipe() {
  useTitle("L'équipe et son projet - Curiexplore");

  return (
    <Container>
      <Breadcrumb>
        <BreadcrumbItem asLink={<RouterLink to="/" />}>
          Accueil
        </BreadcrumbItem>
        <BreadcrumbItem>
          L'équipe et son projet
        </BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col>
          <Title as="h1">
            CurieXplore
          </Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <Title as="h4" look="h4">
            Portrait des systèmes d'enseignement supérieur, de recherche et d'innovation des pays partenaires de la France
          </Title>
          <Text>
            CurieXplore propose un service d'aide à la compréhension des systèmes d'enseignement supérieur, de recherche et d'innovation des pays partenaires de la France.
          </Text>
          <Text>
            CurieXplore mobilise les statistiques de l'OCDE, de l'UNESCO ou de la Banque Mondiale. Produites selon des méthodologies communes par les instituts statistiques nationaux, ces statistiques permettent de positionner avec rigueur les pays les uns par rapport aux autres. En France, la production de ce type d'information, coordonnée par l'Institut national de la statistique et des études économiques (Insee), est assurée par les services de l'Insee et le réseau de la statistique publique.
          </Text>
          <Text>
            CurieXplore combine cette information statistique avec les analyses qualitatives produites par les Conseiller.e.s de coopération et d'action culturelle (COCAC) et les Conseiller.e.s pour la science et la technologie des postes diplomatiques français à l'étranger. Ces experts partagent, au sein de CurieXplore, leur connaissance de terrain des systèmes d'enseignement supérieur, de recherche et d'innovation dans lesquels ils sont immergés.
          </Text>
        </Col>
      </Row>
      <Row>
        <Col n="12 md-8">
          <Title as="h4" look="h4">
            L'équipe
          </Title>
          <Text>
            CurieXplore est le fruit d'une collaboration étroite entre le Ministère de l'Europe et des Affaires étrangères, le Ministère de l'Enseignement Supérieur, de la Recherche et de l'Espace et des acteurs des relations internationales dans les établissements d'enseignement supérieur et de recherche français.
          </Text>
          <Text>
            Les affiliations associées aux acteurs du projet sont celles constatées au moment de leur intervention sur le projet
          </Text>
          <Text>
            <b>
              Au sein du Ministère de l'Europe et des Affaires étrangères :
            </b>
            {' '}
            <br />
            <li>
              <ul className="ul-styled">
                <li>
                  Direction générale de la mondialisation, de la culture, de l'enseignement et du développement international
                </li>
                <Row className="fr-pt-1w">
                  <Col n="4">
                    <p className="fr-logo">
                      Ministère
                      <br />
                      De l'Europe
                      <br />
                      et des affaires
                      <br />
                      étrangères
                    </p>
                  </Col>
                </Row>
              </ul>
            </li>
          </Text>
          <Text>
            <b>
              Au sein du Ministère de l'Enseignement Supérieur, de la Recherche et de l'Espace:
            </b>
            {' '}
            <br />
            <li>
              <ul className="ul-styled">
                <li>
                  Délégation aux Affaires européennes et internationales
                </li>
                <li>
                  Département Ingénierie et science des données
                  {' '}
                  <br />
                  Délégation au numérique et aux données (Direction générale de la recherche et de l'innovation/Direction générale de l'enseignement supérieur et de l'insertion professionnelle)
                </li>
                <Row className="fr-pt-1w">
                  <Col n="4">
                    <p className="fr-logo">
                      Ministère
                      <br />
                      de l'Enseignement
                      <br />
                      Supérieur,
                      <br />
                      de la Recherche
                      <br />
                      et de l'Espace
                    </p>
                  </Col>
                </Row>
              </ul>
            </li>
          </Text>
        </Col>
        <Col n="12 md-4">
          <img src={image1} className="fr-responsive-img" alt="Coopération" aria-hidden />
        </Col>
      </Row>
    </Container>
  );
}
