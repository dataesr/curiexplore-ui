/* eslint-disable max-len */
import { Link as RouterLink } from 'react-router-dom';
import { Col, Container, Row, Text, Breadcrumb, BreadcrumbItem, Title } from '@dataesr/react-dsfr';
import { useTitle } from '../hooks/usePageTitle';

export default function MentionsLegalesPage() {
  useTitle('Accessibilité - CurieXplore');

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
            Accessibilité
          </Title>
          <Title as="h2">
            Déclaration d'accessibilité
          </Title>
          <Text>
            Le Ministère de l'Enseignement Supérieur et de la Recherche s’engage à rendre son site « CurieXplore » accessible conformément à l’article 47 de la loi n° 2005-102 du 11 février 2005. À cette fin, elle met en œuvre la stratégie et les actions suivantes : réalisation d'un audit de conformité en 2023.
          </Text>
          <Text>
            Cette déclaration d’accessibilité s’applique à CurieXplore.
          </Text>
          <Title as="h2">
            État de conformité
          </Title>
          <Text>
            CurieXplore est en conformité partielle avec le référentiel général d’amélioration de l’accessibilité RGAA version 4.1. Les non-conformités et les éventuelles dérogations sont énumérées ci-dessous.
          </Text>
          <Title as="h2">
            Résultats des tests
          </Title>
          <Text>
            L’audit de conformité réalisé par la société Empreinte Digitale puis par le département Ingénierie et science des données révèle que 87.04% des critères RGAA sont respectés.
          </Text>
          <Title as="h3">
            Contenus inaccessibles
          </Title>
          <Text>
            Les contenus listés ci-dessous ne sont pas accessibles pour les raisons suivantes.
          </Text>
          <Title as="h4">
            Non conformité
          </Title>
          <Text>
            Ne sont listées ici que les non-conformités jugées les plus sévères et présentes en quantités importantes dans les pages de l’échantillon. Sur demande, le résultat complet de l’audit peut être mis à disposition.
          </Text>
          <ul className="ul-styled">
            <li>
              Composants modals : l’utilisation de composants JavaScript non accessibles aux technologies d’assistance.
            </li>
            <li>
              Exports PDF non accessibles
            </li>
          </ul>
          <Title as="h2">
            Établissement de cette déclaration d’accessibilité
          </Title>
          <Text>
            Cette déclaration a été établie en octobre 2023.
            {' '}
            <br />
            Elle a été mise à jour :
            <ul className="ul-styled">
              <li>
                en décembre 2023
              </li>
            </ul>
          </Text>
          <Title as="h3">
            Technologies utilisées pour la réalisation du site
          </Title>
          <ul className="ul-styled">
            <li>JavaScript;</li>
            <li>
              <a
                href="https://fr.legacy.reactjs.org/"
                rel="noreferrer"
                target="_blank"
              >
                React
              </a>
              ;
            </li>
            <li>
              <a
                href="https://www.systeme-de-design.gouv.fr/"
                rel="noreferrer"
                target="_blank"
              >
                Système de Design de l'État
              </a>
            </li>
          </ul>
          <Title as="h3">
            Environnement de test
          </Title>
          <Text>
            Les vérifications de restitution de contenus ont été réalisées avec les configurations suivantes :
          </Text>
          <ul className="ul-styled">
            <li>
              Firefox et NVDA ;
            </li>
            <li>
              Safari et VoiceOver;
            </li>
            <li>
              Firefox et Jaws.
            </li>
          </ul>
          <Title as="h3">
            Outils pour évaluer l'accessibilité
          </Title>
          <ul className="ul-styled">
            <li>
              Colour Contrast Analyser ;
            </li>
            <li>
              Extension « Web Developer » ;
            </li>
            <li>
              Extension « Assistant RGAA » ;
            </li>
            <li>
              Extension « WCAG Contrast checker » ;
            </li>
            <li>
              Extension « ARC Toolkit » ;
            </li>
            <li>
              Extension « HeadingsMap » ;
            </li>
            <li>
              Outils pour développeurs intégrés au navigateur Firefox ;
            </li>
            <li>
              Validateur HTML du W3C.
            </li>
          </ul>
          <Title as="h2">
            Pages du site ayant fait l’objet de la vérification de conformité
          </Title>
          <ul className="ul-styled">
            <li>
              <a
                href="/"
                rel="noreferrer"
              >
                Page d'accueil
              </a>
            </li>
            <li>
              <a
                href="/annuaire"
                rel="noreferrer"
              >
                Annuaire
              </a>
            </li>
            <li>
              <a
                href="/mentions-legales"
                rel="noreferrer"
              >
                Mentions légales
              </a>
            </li>
            <li>
              <a
                href="/accessibilite"
                rel="noreferrer"
              >
                Accessibilité
              </a>
            </li>
            <li>
              <a
                href="/pays/BRA/enseignement-sup"
                rel="noreferrer"
              >
                Enseignement supérieur, fiche Brésil
              </a>
            </li>
            <li>
              <a
                href="/pays/BRA/liens-utiles"
                rel="noreferrer"
              >
                Liens utiles, fiche Brésil
              </a>
            </li>
            <li>
              <a
                href="/pays/BRA/acteurs"
                rel="noreferrer"
              >
                Acteurs, fiche Brésil
              </a>
            </li>
            <li>
              <a
                href="/pays/BRA/acteurs/4r3q9"
                rel="noreferrer"
              >
                Fiche acteur, ambassade de France du Brésil
              </a>
            </li>
          </ul>
          <Title as="h2">
            Retour d'information et contact
          </Title>
          <Text>
            Si vous n’arrivez pas à accéder à un contenu ou à un service, vous pouvez contacter le responsable du site internet pour être orienté vers une alternative accessible ou obtenir le contenu sous une autre forme.
          </Text>
          <ul className="ul-styled">
            <li>
              Contacter le responsable du site par courriel:&nbsp;
              <a
                href="mailto:contact.curie@recherche.gouv.fr"
              >
                contact.curie@recherche.gouv.fr
              </a>
            </li>
          </ul>
          <Title as="h2">
            Voies de recours
          </Title>
          <Text>
            Si vous constatez un défaut d’accessibilité vous empêchant d’accéder à un contenu ou une fonctionnalité du site, que vous nous le signalez et que vous ne parvenez pas à obtenir une réponse rapide de notre part, vous êtes en droit de faire parvenir vos doléances ou une demande de saisine au Défenseur des droits.
          </Text>
          <Text>
            Plusieurs moyens sont à votre disposition :
          </Text>
          <ul className="ul-styled">
            <li>
              <a
                href="https://formulaire.defenseurdesdroits.fr/formulaire_saisine/"
                rel="noreferrer"
                target="_blank"
              >
                un formulaire de contact
              </a>
            </li>
            <li>
              la&nbsp;
              <a
                href="https://www.defenseurdesdroits.fr/carte-des-delegues"
                rel="noreferrer"
                target="_blank"
              >
                liste des délégués de votre région
              </a>
              &nbsp;avec leurs informations de contact directs
            </li>
            <li>
              un numéro de téléphone :&nbsp;
              <a
                href="tel:+33969390000"
              >
                +33 (0) 9 69 39 00 00
              </a>
              &nbsp; du lundi au vendredi de 8h30 à 19h30 (coût d’un appel local)
            </li>
            <li>
              une adresse postale dans&nbsp;
              <a
                href="https://lannuaire.service-public.fr/autorites-independantes/1867f065-c823-4362-8d0f-8ca6b011a10f"
                rel="noreferrer"
                target="_blank"
              >
                l’annuaire de l’administration
              </a>
            </li>

          </ul>
        </Col>
      </Row>
    </Container>
  );
}
