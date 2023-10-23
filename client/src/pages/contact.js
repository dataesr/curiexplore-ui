/* eslint-disable max-len */
import { Link as RouterLink } from 'react-router-dom';
import { Col, Container, Row, Text, Breadcrumb, BreadcrumbItem } from '@dataesr/react-dsfr';

import image1 from '../assets/img/mail-send.svg';
import { useTitle } from '../hooks/usePageTitle';

export default function ContactsAndResourcesPage() {
  useTitle('Curiexplore - Contacts');

  return (
    <Container>
      <Breadcrumb>
        <BreadcrumbItem asLink={<RouterLink to="/" />}>
          Accueil
        </BreadcrumbItem>
        <BreadcrumbItem>
          Nous contacter
        </BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col n="12 md-8">
          <Text>
            CurieXplore est un outil évolutif, destiné à évoluer et à héberger de nouvelles foncitonnalités. L'expérience utilisateur contribue de manière fondamentale à ces évolutions. Vous avez des questions, des remarques, des suggestions ?
          </Text>
          <Text>
            N'hésitez pas à nous contacter pour les partager avec nous.
            Ecrivez-nous à
            {' '}
            <a
              href="mailto:contact.curie@recherche.gouv.fr"
            >
              contact.curie@recherche.gouv.fr
            </a>
          </Text>
        </Col>
        <Col n="12 md-4">
          <img src={image1} className="fr-responsive-img" alt="Mail" aria-hidden />
        </Col>
      </Row>
    </Container>
  );
}
