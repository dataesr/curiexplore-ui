import { useState } from 'react';
import {
  Breadcrumb, BreadcrumbItem,
  ButtonGroup,
  Col, Container, Row,
  Icon,
  Modal, ModalClose, ModalContent, ModalTitle,
  SideMenu, SideMenuLink,
  Text,
  Title,
  Checkbox,
  Highlight,
} from '@dataesr/react-dsfr';
import { FormattedDate } from 'react-intl';
import { useParams, useLocation, Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import Button from '../../components/button';
import useFetchData from './hooks/useFetchData';
import CountryBadgeList from './components/country-badge-list';

const listModules = [
  'Politique ESRI',
  'Enseignement supérieur',
  'Recherche et innovation',
  'Coopérations internationales',
  'Mobilité étudiante',
];

export default function Fiche() {
  const { isoCode } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const selected = pathname.split('/').pop();
  const { data, isLoading, error, isUnknownCountry } = useFetchData(isoCode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exportList, setExportList] = useState([]);
  const [isExport, setIsExport] = useState(false);
  if (isUnknownCountry) navigate('/404');
  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error ...</div>;

  const dataPays = data['curiexplore-pays']?.find((country) => country.fields.iso3 === isoCode).fields;
  const dataTimestamp = data['curiexplore-timestamp']?.[0]?.fields;

  const onCheckBoxClick = (label) => {
    if (!exportList.includes(label)) {
      setExportList([...exportList, label]);
    } else {
      setExportList(exportList.filter((item) => item !== label));
    }
  };

  const exportAction = () => {
    setIsExport(true);
    navigate('export', { state: { exportList } });
  };
  if (!dataPays) return null;
  return (
    <>
      <Container spacing="pb-6w">
        <Row>
          {!isExport && (
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
                  <Icon name="ri-government-line" size="1x" />
                  Enseignement supérieur
                </SideMenuLink>
                <SideMenuLink asLink={<RouterLink to="recherche" replace />} current={(selected === 'recherche')}>
                  <Icon name="ri-flask-line" size="1x" />
                  Recherche et innovation
                </SideMenuLink>
                <SideMenuLink asLink={<RouterLink to="acteurs" replace />} current={(selected === 'acteurs')}>
                  <Icon name="ri-team-line" size="1x" />
                  Les acteurs
                </SideMenuLink>
                <SideMenuLink asLink={<RouterLink to="cooperation-avec-la-france" replace />} current={(selected === 'cooperation-avec-la-france')}>
                  <Icon name="ri-map-pin-3-line" size="1x" />
                  Liens avec la France
                </SideMenuLink>
                <SideMenuLink asLink={<RouterLink to="cooperation-internationale" replace />} current={(selected === 'cooperation-internationale')}>
                  <Icon name="ri-global-line" size="1x" />
                  Coopérations internationales
                </SideMenuLink>
                <SideMenuLink asLink={<RouterLink to="mobilite-etudiante" replace />} current={(selected === 'mobilite-etudiante')}>
                  <Icon name="ri-drag-move-line" size="1x" />
                  Mobilité étudiante
                </SideMenuLink>
                <SideMenuLink asLink={<RouterLink to="pays-similaires" replace />} current={(selected === 'pays-similaires')}>
                  <Icon name="ri-earth-line" size="1x" />
                  Pays similaires
                </SideMenuLink>
                <SideMenuLink asLink={<RouterLink to="liens-utiles" replace />} current={(selected === 'pays-similaires')}>
                  <Icon name="ri-contacts-book-line" size="1x" />
                  Liens utiles
                </SideMenuLink>
              </SideMenu>
            </Col>
          )}
          <Col n={`12 ${(isExport) ? 'md-12' : 'md-9'}`}>
            <Container fluid spacing="mb-5w">
              <Row className="fr-mt-1w stick">
                <Breadcrumb>
                  <BreadcrumbItem asLink={<RouterLink to="/" />}>
                    Accueil
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    {dataPays.name_fr}
                    {' '}
                    (
                    {dataPays.name_native}
                    )
                  </BreadcrumbItem>
                </Breadcrumb>
                <ButtonGroup isInlineFrom="xs" className="fr-mt-1v fr-ml-auto">
                  <Button
                    tertiary
                    borderless
                    rounded
                    title="Télécharger la synthèse"
                    onClick={() => setIsModalOpen(!isModalOpen)}
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
                  {dataPays.name_fr}
                  {' '}
                  (
                  {dataPays.name_native}
                  )
                </Title>
                <img alt="Drapeau" className="fr-ml-2w" src={dataPays.flag} height="40px" />
                <Text spacing="mb-1v ml-auto" as="span" size="xs" bold={false}>
                  {' '}
                  Mis à jour le
                  {' '}
                  <FormattedDate
                    value={dataTimestamp?.submitdate}
                    day="numeric"
                    month="long"
                    year="numeric"
                  />
                </Text>
              </Row>
              <Row>
                <CountryBadgeList data={dataPays} geographic />
              </Row>
              <Row>
                <CountryBadgeList type="info" data={dataPays} policy />
              </Row>
            </Container>
            <Container fluid as="section">
              <Outlet context={data} />
            </Container>
          </Col>
        </Row>
      </Container>
      <Modal
        size="lg"
        isOpen={isModalOpen}
        hide={() => { setIsModalOpen(false); }}
      >
        <ModalClose hide={() => { setIsModalOpen(false); }}>Fermer</ModalClose>
        <ModalTitle>
          Sélectionner les éléments à exporter
        </ModalTitle>
        <ModalContent>
          <Highlight colorFamily="yellow-tournesol">
            Seuls les données éditoriales rensignées par les ambassades sont exportables.
          </Highlight>
          <p>
            <ul>
              {
                listModules.map((module) => (
                  <li style={{ listStyle: 'none' }} key={uuidV4()}>
                    <Checkbox
                      value={module}
                      label={module}
                      onClick={() => onCheckBoxClick(module)}
                      onChange={() => onCheckBoxClick(module)}
                      checked={exportList.includes(module)}
                    />
                  </li>
                ))
              }
            </ul>
          </p>
          <Button
            onClick={() => exportAction()}
            disabled={exportList.length === 0}
          >
            Exporter
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
}
