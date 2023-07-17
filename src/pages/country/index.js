import { useState, useEffect } from 'react';
import { useParams, useLocation, Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Breadcrumb, BreadcrumbItem,
  ButtonGroup,
  Col, Container, Row, Link,
  Icon,
  Modal, ModalClose, ModalContent, ModalTitle,
  SideMenu, SideMenuLink,
  Text,
  Title,
  Checkbox,
  Highlight,
} from '@dataesr/react-dsfr';
import { FormattedDate } from 'react-intl';
import { v4 as uuidV4 } from 'uuid';
import Button from '../../components/button';
import useFetchData from './hooks/useFetchData';
import CountryBadgeList from './components/country-badge-list';
import Loader from '../../utils/Loader';

const listModules = [
  'Politique ESRI',
  'Enseignement supérieur',
  'Recherche et innovation',
  'Coopérations internationales',
  'Mobilité étudiante',
];

export default function Fiche({ exportState }) {
  const { isoCode } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const selected = pathname.split('/').pop();
  const { data, isLoading, error, isUnknownCountry } = useFetchData(isoCode);
  let actorName = '';

  const dataPays = data['curiexplore-pays']?.find((country) => country.fields.iso3 === isoCode).fields;
  const dataTimestamp = data['curiexplore-timestamp']?.[0]?.fields;
  const campusFrance = dataPays?.cf_mobility;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exportList, setExportList] = useState([]);
  const [isExport, setIsExport] = useState(false);

  useEffect(() => {
    setIsExport(exportState);
  }, [exportState]);

  if (data['actors-data']) {
    const actorData = data['actors-data']?.filter((actor) => actor?.id === selected);
    actorName = actorData[0]?.displayName;
  }

  if (isUnknownCountry) navigate('/404');
  if (isLoading) return <Loader />;
  if (error) return <div>Error ...</div>;

  const onCheckBoxClick = (label) => {
    if (!exportList.includes(label)) {
      setExportList([...exportList, label]);
    } else {
      setExportList(exportList.filter((item) => item !== label));
    }
  };

  const exportAction = () => {
    setIsExport(true);
    navigate('export', { state: { exportList, fromUrl: `/pays/${isoCode}/profil`, isoCode } });
    setIsModalOpen(false);
    setIsExport(false);
  };

  if (!dataPays) return null;
  return (
    <>
      <Container spacing="pb-6w">
        {!isExport && (
          <Row>
            <Col n="12 md-3">
              <SideMenu buttonLabel="Navigation">
                <SideMenuLink asLink={<RouterLink to="profil" replace />} current={(selected === 'profil')}>
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
                <SideMenuLink asLink={<RouterLink to="liens-utiles" replace />} current={(selected === 'liens-utiles')}>
                  <Icon name="ri-contacts-book-line" size="1x" />
                  Liens utiles
                </SideMenuLink>
                {isoCode === 'CHN' ? (
                  <>
                    <SideMenuLink asLink={<RouterLink to="/pays/HKG" replace />} current={(selected === '')}>
                      <Icon name="ri-arrow-left-right-line" size="1x" />
                      Voir la fiche de Hong-Kong
                    </SideMenuLink>
                    <SideMenuLink asLink={<RouterLink to="/pays/MAC" replace />} current={(selected === '')}>
                      <Icon name="ri-arrow-left-right-line" size="1x" />
                      Voir la fiche de Macao
                    </SideMenuLink>
                  </>
                ) : null}
                {isoCode === 'HKG' ? (
                  <SideMenuLink asLink={<RouterLink to="/pays/CHN" replace />} current={(selected === 'liens-')}>
                    <Icon name="ri-arrow-left-right-line" size="1x" />
                    Voir la fiche de la Chine
                  </SideMenuLink>
                ) : null}
                {isoCode === 'MAC' ? (
                  <SideMenuLink asLink={<RouterLink to="/pays/CHN" replace />} current={(selected === '')}>
                    <Icon name="ri-arrow-left-right-line" size="1x" />
                    Voir la fiche de la Chine
                  </SideMenuLink>
                ) : null}
                {
                  campusFrance ? (
                    <SideMenuLink asLink={<Link href={`${campusFrance}`} target="_blank" />} current={(selected === '')}>
                      <Icon name="ri-arrow-left-right-line" size="1x" />
                      Voir la fiche Campus France
                    </SideMenuLink>
                  ) : null
                }
              </SideMenu>
            </Col>

            <Col n={`12 ${(isExport) ? 'md-12' : 'md-9'}`}>
              <Container fluid spacing="mb-5w">
                <Row className="fr-mt-1w stick">
                  <Breadcrumb>
                    <BreadcrumbItem asLink={<RouterLink to="/" />}>
                      Accueil
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      {dataPays.name_fr}
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      {actorName ? actorName.charAt(0).toUpperCase() + actorName.slice(1) : ''}
                    </BreadcrumbItem>
                  </Breadcrumb>
                  <ButtonGroup isInlineFrom="xs" className="fr-mt-2v fr-ml-auto">
                    <Button
                      tertiary
                      borderless
                      rounded
                      title="Télécharger la synthèse"
                      onClick={() => setIsModalOpen(!isModalOpen)}
                      icon="ri-download-2-fill"
                    />
                    {/*                     <Button
                        tertiary
                        borderless
                        rounded
                        title="Télécharger les données"
                        icon="ri-file-excel-line"
                      /> */}
                  </ButtonGroup>
                </Row>
                {!actorName ? (
                  <>
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
                  </>
                ) : (
                  <Row alignItems="right">
                    <Text spacing="mb-1v ml-right" as="span" size="xs" bold={false}>
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
                ) }
              </Container>
              <Container fluid as="section">
                <Outlet context={data} />
              </Container>
            </Col>
          </Row>
        )}

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

Fiche.defaultProps = {
  exportState: false,
};

Fiche.propTypes = {
  exportState: PropTypes.bool,
};
