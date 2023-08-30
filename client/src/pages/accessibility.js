/* eslint-disable max-len */
import { Link as RouterLink } from 'react-router-dom';
import { Col, Container, Row, Text, Breadcrumb, BreadcrumbItem, Title } from '@dataesr/react-dsfr';

export default function MentionsLegalesPage() {
  return (
    <Container>
      <Breadcrumb>
        <BreadcrumbItem asLink={<RouterLink to="/" />}>
          Accueil
        </BreadcrumbItem>
        <BreadcrumbItem>
          Accessibilité
        </BreadcrumbItem>
      </Breadcrumb>
      <Row className="fr-mb-5w">
        <Col>
          <Title as="h1">
            Accessibilité : non conforme (audit en cours)
          </Title>
          <Text>
            Le Ministère de l'enseignement supérieur et de la recherche (MESR) s'engage à rendre son site application « Repères et références statistiques interactifs » (RERSI) accessible conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005. À cette fin, elle met en œuvre la stratégie et les actions suivantes : réalisation d'un audit de conformité en 2023.
          </Text>
          <Title as="h2">
            État de conformité
          </Title>
          <Text>
            À ce jour, n'ayant pas fait l'objet d'un audit de conformité, l'application RERSI est considérée par défaut comme « non conforme ». La désignation de ce niveau de conformité pourra évoluer en fonction des résultats produits par l'audit.
          </Text>
          <Title as="h2">
            Test de conformité
          </Title>
          <Text>
            L'audit de conformité commandé par la MESR est en attente de réalisation par un tiers indépendant ou en auto-évaluation. Il sera effectué en 2023 et ses résultats seront affichés au sein de cette page.
          </Text>
          <Title as="h2">
            Retour d'information et contact
          </Title>
          <Text>
            Si vous n'arrivez pas à accéder à un contenu, vous pouvez contacter le responsable du site internet (
            <a
              href="mailto:contact.curie@recherche.gouv.fr"
            >
              contact.curie@recherche.gouv.fr
            </a>
            ) pour être orienté vers une alternative accessible ou obtenir le contenu sous une autre forme.
          </Text>
          <Title as="h2">
            Voies de recours
          </Title>
          <Text>
            Cette procédure est à utiliser dans le cas suivant. Vous avez signalé au responsable du site internet un défaut d'accessibilité qui vous empêche d'accéder à un contenu ou à un des services du portail et vous n'avez pas obtenu de réponse satisfaisante.
          </Text>
          <ul>
            <li>Écrire un message au Défenseur des droits</li>
            <li>Contacter le délégué du Défenseur des droits dans votre région</li>
            <li>Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) Défenseur des droits - Libre réponse 71120 75342 Paris CEDEX 07</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}
