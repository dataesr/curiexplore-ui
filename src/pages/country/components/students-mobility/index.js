/* eslint-disable max-len */
import { useOutletContext } from 'react-router-dom';
import { Col, Row } from '@dataesr/react-dsfr';
import ChartComponents from '../chart-components';
import MobilityCallOut from './components/mobility';

import Title from '../../../../components/title';
import HtmlAmbassyBloc from '../../../../components/html-ambassy-bloc';
import charts from './charts.json';

export default function StudentsMobilityPage() {
  const contextData = useOutletContext();
  const analyse = contextData['curiexplore-analyse'];

  const blocs = [];
  if (analyse.length !== 0) {
    blocs.push(analyse.find((el) => (el.fields.codethematique === 'A9'))?.fields || null);
    blocs.push(analyse.find((el) => (el.fields.codethematique === 'A10'))?.fields || null);
  }

  return (
    <>
      <MobilityCallOut />
      <Row>
        <Col>
          {blocs.map((bloc) => (
            <HtmlAmbassyBloc data={bloc} />
          ))}
        </Col>
      </Row>
      <Title
        as="h4"
        title="Les données de la mobilité étudiante"
        subTitle="Les informations présentes ci-dessous sont collectées par le département des outils d'aide à la décision du Ministère de l'enseignement supérieur et de la recherche (MESR) et sont mises à jour 1 à 2 fois par an."
        icon=""
      />
      <Row>
        <Col n="12">
          <ChartComponents charts={charts} />
        </Col>
      </Row>
    </>
  );
}
