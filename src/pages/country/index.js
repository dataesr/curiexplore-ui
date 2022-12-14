import { Breadcrumb, BreadcrumbItem, ButtonGroup, Col, Container, Icon, Row, SideMenu, SideMenuLink, Text, Title } from '@dataesr/react-dsfr';
import { FormattedDate } from 'react-intl';
import { useParams, useLocation, Link as RouterLink, Outlet } from 'react-router-dom';
import Button from '../../components/button';
import useFetchData from './hooks/useFetchData';
import CountryBadgeList from './components/country-badge-list';

export default function Fiche() {
  const { isoCode } = useParams();
  const { pathname } = useLocation();
  const selected = pathname.split('/').pop();
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
            <SideMenuLink asLink={<RouterLink to="politique-esri" replace />} current={(selected === 'politique-esri')}>
              <Icon name="ri-newspaper-line" size="1x" />
              Politique ESRI
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="enseignement-sup" replace />} current={(selected === 'enseignement-sup')}>
              <Icon name="ri-team-line" size="1x" />
              Enseignement supérieur
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="recherche" replace />} current={(selected === 'enseignement-sup')}>
              <Icon name="ri-calendar-line" size="1x" />
              Recherche et innovation
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="acteurs" replace />} current={(selected === 'acteurs')}>
              <Icon name="ri-folders-line" size="1x" />
              Les acteurs
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="cooperation-avec-la-france" replace />} current={(selected === 'cooperation-avec-la-france')}>
              <Icon name="ri-folders-line" size="1x" />
              Liens avec la France
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="cooperation-internationale" replace />} current={(selected === 'cooperation-internationale')}>
              <Icon name="ri-folders-line" size="1x" />
              Coopérations internationale
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="mobilite-etudiante" replace />} current={(selected === 'mobilite-etudiante')}>
              <Icon name="ri-folders-line" size="1x" />
              Mobilité étudiante
            </SideMenuLink>
            <SideMenuLink asLink={<RouterLink to="contacts-et-ressources" replace />} current={(selected === 'contacts-et-ressources')}>
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
            <Row spacing="mb-3v" alignItems="middle">
              <Title spacing="mb-1v" as="h2">
                {data.name_fr}
              </Title>
              <img alt="Drapeau" className="fr-ml-2w" src={data.flag} height="40px" />
              <Text spacing="mb-1v ml-auto" as="span" size="xs" bold={false}>
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
