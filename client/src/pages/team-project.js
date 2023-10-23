/* eslint-disable max-len */
import { Link as RouterLink } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row, Text, Title } from '@dataesr/react-dsfr';

import image1 from '../assets/img/human-cooperation.svg';
import { useTitle } from '../hooks/usePageTitle';

export default function ProjetEtEquipe() {
  useTitle("Curiexplore - L'équipe et son projet");

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
            Portrait des systèmes de l'enseignement supérieur, de la recherche et de l'innovation des pays partenaires de la France
          </Title>
          <Text>
            CurieXplore propose un service d'aide à la compréhension des systèmes d'enseignement supérieur, de recherche et d'innovation des pays partenaires de la France.
          </Text>
          <Text>
            CurieXplore mobilise les statistiques de l'OCDE, de l'UNESCO ou de la Banque Mondiale. Produites selon des méthodologies communes par les instituts statistiques nationaux, ces statistiques permettent de positionner avec rigueur les pays les uns par rapport aux autres. En France, la production de ce type d'information, coordonnée par l'Institut national de la statistique et des études économiques (Insee), est assurée par les services de l'Insee et le réseau de la statistique publique. La sous-direction des systèmes d'information et des études statistiques (SIES), service statistique ministériel au sein du ministère de l'enseignement supérieur, de la recherche et de l'innovation est ainsi responsable de la production de l'information statistique sur champ de l'enseignement supérieur et de la recherche.
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
            CurieXplore est le fruit d'une collaboration étroite entre le ministère de l'Europe et des Affaires étrangères, le ministère de l'Enseignement supérieur, de la Recherche et de l'Innovation et des acteurs des relations internationales dans les établissements d'enseignement supérieur et de recherche français.
          </Text>
          <Text>
            Les affiliations associées aux acteurs du projets sont celles constatées au moment de leur intervention sur le projet
          </Text>
          <Text>
            <b>
              Au sein du ministère de l'Europe et des Affaires étrangères :
            </b>
            {' '}
            <br />
            <li>
              <ul>
                Direction générale de la mondialisation, de la culture, de l'enseignement et du développement international
              </ul>
            </li>
          </Text>
          <Text>
            <b>
              Au sein du ministère de l'Enseignement supérieur et de la Recherche :
            </b>
            {' '}
            <br />
            <li>
              <ul>
                Délégation aux Affaires européennes et internationales
              </ul>
              <ul>
                Sous-direction des systèmes d'information et des études statistiques (Direction générale de la recherche et de l'innovation/Direction générale de l'enseignement supérieur et de l'insertion professionnelle)
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
