import { Breadcrumb, BreadcrumbItem, ButtonGroup, Col, Container, Icon, Row, SideMenu, SideMenuLink, Text, Title } from '@dataesr/react-dsfr';
import { FormattedDate } from 'react-intl';
import { useParams, useLocation, Link as RouterLink, Outlet } from 'react-router-dom';
import Button from '../../components/button';
import useFetchData from './hooks/useFetchData';
import CountryBadgeList from './components/country-badge-list';

export default function Fiche() {
  const { isoCode } = useParams();
  const { pathname } = useLocation();
  const selected = pathname.split('/')?.[0];
  const { data: fetchedData, isLoading, error } = useFetchData(isoCode);

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error ...</div>;

  const data = fetchedData['curiexplore-pays']?.[0]?.fields;
  if (!data) return null;
  return (
    <Container spacing="pb-6w">
      <Row>
        <Col n="12 md-3">
          <SideMenu buttonLabel="Navigation">
            <SideMenuLink asLink={<RouterLink to="profile" replace />} current={(selected === 'profile')}>
              <Icon name="ri-eye-2-line" size="1x" />
              Connaitre le pays
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="politique-esri" replace />} current={(selected === 'policy')}>
              <Icon name="ri-newspaper-line" size="1x" />
              Politique ESRI
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="enseignement-sup" replace />} current={(selected === 'high-education')}>
              <Icon name="ri-team-line" size="1x" />
              Enseignement supérieur
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="recherche" replace />} current={(selected === 'research')}>
              <Icon name="ri-calendar-line" size="1x" />
              Recherche et innovation
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="acteurs" replace />} current={(selected === 'actors')}>
              <Icon name="ri-folders-line" size="1x" />
              Les acteurs
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="cooperation-avec-la-france" replace />} current={(selected === 'links-with-france')}>
              <Icon name="ri-folders-line" size="1x" />
              Liens avec la France
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="cooperation-internationale" replace />} current={(selected === 'international-cooperation')}>
              <Icon name="ri-folders-line" size="1x" />
              Coopérations internationale
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="mobilite-etudiante" replace />} current={(selected === 'student-mobility')}>
              <Icon name="ri-folders-line" size="1x" />
              Mobilité étudiante
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="contacts-et-ressources" replace />} current={(selected === 'contacts-and-resources')}>
              <Icon name="ri-folders-line" size="1x" />
              Contacts et ressources
            </SideMenuLink>
          </SideMenu>
        </Col>
        <Col n="12 md-9">
          <Container fluid spacing="mb-5w">
            <Row className="fr-mt-1w stick">
              <Breadcrumb>
                <BreadcrumbItem asLink={<RouterLink to="/" />}>
                  Accueil
                </BreadcrumbItem>
                <BreadcrumbItem>
                  {data.name_fr}
                </BreadcrumbItem>
              </Breadcrumb>

              <ButtonGroup isInlineFrom="xs" className="fr-mt-1v fr-ml-auto">
                <Button
                  tertiary
                  borderless
                  rounded
                  title="Télécharger la synthèse"
                  // onClick={() => setIsExportOpen(true)}
                  icon="ri-download-2-fill"
                />
                <Button
                  tertiary
                  borderless
                  rounded
                  title="Télécharger les données"
                  // onClick={() => toggle()}
                  icon="ri-file-excel-line"
                />
              </ButtonGroup>
            </Row>
            <Row>
              <Title spacing="mb-1v mr-auto" as="h2">
                {data.name_fr}
              </Title>
              <Text spacing="mb-1v" as="span" size="xs" bold={false}>
                {' '}
                mis à jour le
                {' '}
                <FormattedDate
                  value="2020-12-01"
                  day="numeric"
                  month="long"
                  year="numeric"
                />
              </Text>
            </Row>
            <Row>
              <CountryBadgeList data={data} geographic />
            </Row>
            <Row>
              <CountryBadgeList type="info" data={data} policy />
            </Row>
          </Container>
          <Container fluid>
            <Outlet context={data} />
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
