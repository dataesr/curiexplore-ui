import { useRef, useState } from 'react';
import { useLocation, useOutletContext, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { v4 as uuidv4 } from 'uuid';
import { Container, Row, Col, Title, Icon, Text } from '@dataesr/react-dsfr';
import { FormattedDate } from 'react-intl';

import HtmlAmbassyBloc from '../../../components/html-ambassy-bloc';

export default function ExportPage() {
  const { state } = useLocation();
  const { exportList, fromUrl, isoCode } = state;
  const contextData = useOutletContext();
  const dataAnalyse = contextData['curiexplore-analyse'];
  const navigate = useNavigate();
  const componentRef = useRef();
  const [loading, setLoading] = useState(true);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'export.pdf',
    onAfterPrint: () => navigate(fromUrl, { state: { exportState: false } }),
    removeAfterPrint: true,
  });

  const dataPays = contextData['curiexplore-pays']?.find((country) => country.fields.iso3 === isoCode).fields;
  const dataTimestamp = contextData['curiexplore-timestamp']?.[0]?.fields;

  const policyBlocs = [];
  let dataES = null;
  let dataRI = null;
  const cooperationBlocs = [];
  const studentMobility = [];
  if (dataAnalyse.length !== 0) {
    policyBlocs.push(dataAnalyse.find((el) => (el.fields.codethematique === 'A1'))?.fields || null);
    policyBlocs.push(dataAnalyse.find((el) => (el.fields.codethematique === 'A2'))?.fields || null);
    policyBlocs.push(dataAnalyse.find((el) => (el.fields.codethematique === 'A3'))?.fields || null);
    policyBlocs.push(dataAnalyse.find((el) => (el.fields.codethematique === 'A4'))?.fields || null);
    dataES = dataAnalyse.find((el) => (el.fields.codethematique === 'A5'))?.fields || null;
    dataRI = dataAnalyse.find((el) => (el.fields.codethematique === 'A6')).fields || null;

    cooperationBlocs.push(dataAnalyse.find((el) => (el.fields.codethematique === 'A7'))?.fields || null);
    cooperationBlocs.push(dataAnalyse.find((el) => (el.fields.codethematique === 'A8'))?.fields || null);

    studentMobility.push(dataAnalyse.find((el) => (el.fields.codethematique === 'A9'))?.fields || null);
    studentMobility.push(dataAnalyse.find((el) => (el.fields.codethematique === 'A10'))?.fields || null);
  }

  setTimeout(() => {
    setLoading(false);
    handlePrint();
  }, 1000);

  if (loading) return <div>Préparaion de l'export</div>;

  return (
    <div className="print" ref={componentRef}>
      <Container>
        <Row spacing="mb-3v" alignItems="middle">
          <Title spacing="mb-1v" as="h2">
            {dataPays.name_fr}
            {' '}
            (
            {dataPays.name_native}
            )
          </Title>
          <img alt="" className="fr-ml-2w" src={dataPays.flag} height="40px" />
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
        {exportList.includes('Politique ESRI') && (
          <Row>
            <Col n="12">
              <Title as="h2" size="h2" className="fr-mb-2w">
                <Icon name="ri-newspaper-line" size="1x" />
                Politique ESRI
              </Title>
              {policyBlocs.map((bloc) => (
                <HtmlAmbassyBloc data={bloc} key={uuidv4()} exportView />
              ))}
            </Col>
          </Row>
        )}
        {exportList.includes('Enseignement supérieur') && (
          <Row>
            <Col n="12">
              <Title as="h2" size="h2" className="fr-mb-2w">
                <Icon name="ri-newspaper-line" size="1x" />
                Enseignement supérieur
              </Title>
              <HtmlAmbassyBloc data={dataES} key={uuidv4()} exportView />
            </Col>
          </Row>
        )}
        {exportList.includes('Recherche et innovation') && (
          <Row>
            <Col n="12">
              <Title as="h2" size="h2" className="fr-mb-2w">
                <Icon name="ri-newspaper-line" size="1x" />
                Recherche et innovation
              </Title>
              <HtmlAmbassyBloc data={dataRI} key={uuidv4()} exportView />
            </Col>
          </Row>
        )}
        {exportList.includes('Coopérations internationales') && (
          <Row>
            <Col n="12">
              <Title as="h2" size="h2" className="fr-mb-2w">
                <Icon name="ri-newspaper-line" size="1x" />
                Coopérations internationales
              </Title>
              {cooperationBlocs.map((bloc) => (
                <HtmlAmbassyBloc data={bloc} key={uuidv4()} exportView />
              ))}
            </Col>
          </Row>
        )}
        {exportList.includes('Mobilité étudiante') && (
          <Row>
            <Col n="12">
              <Title as="h2" size="h2" className="fr-mb-2w">
                <Icon name="ri-newspaper-line" size="1x" />
                Mobilité étudiante
              </Title>
              {studentMobility.map((bloc) => (
                <HtmlAmbassyBloc data={bloc} key={uuidv4()} exportView />
              ))}
            </Col>
          </Row>
        )}

      </Container>
    </div>
  );
}
