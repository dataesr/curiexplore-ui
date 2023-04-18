/* eslint-disable max-len */
import { useOutletContext } from 'react-router-dom';
import { Container, Col, Row, Title, Highlight, Link } from '@dataesr/react-dsfr';
import ChartComponents from '../chart-components';
import HtmlAmbassyBloc from '../../../../components/html-ambassy-bloc';
import GenericCard from '../../../../components/generic-card';

import charts from './charts.json';
import PieChart from './components/donut/index';
import Pyramid from './components/pyramid/index';

export default function CountryHigherEducationPage() {
  const contextData = useOutletContext();
  const data = contextData['curiexplore-analyse'];
  const dataIDH = contextData['curiexplore-donnees-quantitatives'];
  let dataES = [];

  if (data.length !== 0) {
    dataES = data.find((el) => (el.fields.thematique === 'Enseignement supérieur')).fields || null;
  } else {
    dataES = '';
  }

  // Nombre moyen d'années de scolarité
  const MOYSCO = { ...dataIDH.find((el) => el.fields.code === 'MOYSCO').fields };

  // Espérance de scolarisation
  const ESPSCO = { ...dataIDH.find((el) => el.fields.code === 'ESPSCO').fields };

  const getDescription = (code) => {
    if (code.code === 'MOYSCO') {
      return (
        <Title as="h3">{`${code.value.toFixed(1)} ${code.unit}`}</Title>
      );
    }
    if (code.code === 'ESPSCO') {
      return (
        <Title as="h3">{`${code.value.toFixed(1)} ${code.unit}`}</Title>
      );
    }
    return null;
  };

  return (
    <Container>
      <Row>
        <Col>
          <HtmlAmbassyBloc data={dataES} />
        </Col>
      </Row>
      <Row>
        <Title as="h3">
          Les données de l'enseignement supérieur
        </Title>
      </Row>
      <Row>
        <Highlight className="fr-mb-1w">
          Les informations présentes ci-dessous sont collectées par le département des outils d'aide à la décision du Ministère de l'enseignement supérieur et de la recherche (MESR) et sont mises à jour 1 à 2 fois par an.
        </Highlight>
      </Row>
      <Row className="fr-mb-1w">
        <Col>
          <PieChart />
        </Col>
      </Row>
      <Row className="fr-mb-1w">
        <Col>
          <Pyramid />
        </Col>
      </Row>
      <Row>
        <Title
          as="h4"
          look="h4"
        >
          L'indice d'éducation du pays
        </Title>
      </Row>
      <Row gutters className="fr-mb-1w">
        <Col n="6">
          <GenericCard
            badgeLabel={MOYSCO.year}
            description={getDescription(MOYSCO)}
            title={MOYSCO.label}
          />
        </Col>
        <Col n="6">
          <GenericCard
            badgeLabel={ESPSCO.year}
            description={getDescription(ESPSCO)}
            title={ESPSCO.label}
          />
        </Col>
      </Row>
      <Row className="fr-mb-1w">
        <Highlight>
          Les 3 dimensions qui permettent le calcul de l'indice de développement humain (IDH) sont: l'espérance de vie en bonne santé, le savoir et le niveau de vie.
          Le savoir est un indice d'éducation calculé à partir de l'espérance d'année de scolarisation et le nombre moyen d'années de scolarité.
          Le nombre d'année effectif de scolarité est observé sur la population adulte de plus de 25 ans.
          <br />
          Voir le&nbsp;
          <Link
            href="https://hdr.undp.org/sites/default/files/data/2020/hdr2020_technical_notes.pdf"
            target="_blank"
          >
            détail
          </Link>
          .
        </Highlight>
      </Row>
      <Row>
        <Col>
          <ChartComponents charts={charts} />
        </Col>
      </Row>
    </Container>
  );
}
