import { Col, Container, Icon, Row, SideMenu, SideMenuLink } from '@dataesr/react-dsfr';
import { useParams, Link as RouterLink, Outlet } from 'react-router-dom';
import useFetchData from './hooks/useFetchData';

export default function Fiche() {
  const { isoCode } = useParams();
  const seleted = 'profile';
  const { data, isLoading, error } = useFetchData();

  return (
    <Container spacing="pb-6w">
      <Row>
        <Col n="12 md-3">
          <SideMenu buttonLabel="Navigation">
            <SideMenuLink asLink={<RouterLink to="profile" replace />} current={(seleted === 'profile')}>
              <Icon name="ri-eye-2-line" size="1x" />
              Connaitre le pays
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="policy" replace />} current={(seleted === 'policy')}>
              <Icon name="ri-newspaper-line" size="1x" />
              Politique d'enseignement supérieur, de recherche et d'innovation
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="high-education" replace />} current={(seleted === 'high-education')}>
              <Icon name="ri-team-line" size="1x" />
              Paysage de l'enseignement supérieur
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="research" replace />} current={(seleted === 'research')}>
              <Icon name="ri-calendar-line" size="1x" />
              Paysage de la recherche et de l'innovation
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="actors" replace />} current={(seleted === 'actors')}>
              <Icon name="ri-folders-line" size="1x" />
              Les acteurs
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="links-with-france" replace />} current={(seleted === 'links-with-france')}>
              <Icon name="ri-folders-line" size="1x" />
              Liens avec la France
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="international-cooperation" replace />} current={(seleted === 'international-cooperation')}>
              <Icon name="ri-folders-line" size="1x" />
              Coopération internationale
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="student-mobility" replace />} current={(seleted === 'student-mobility')}>
              <Icon name="ri-folders-line" size="1x" />
              Mobilité étudiante
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="contacts-and-resources" replace />} current={(seleted === 'contacts-and-resources')}>
              <Icon name="ri-folders-line" size="1x" />
              Contacts et ressources
            </SideMenuLink>
          </SideMenu>
        </Col>
        <Col n="12 md-9">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
