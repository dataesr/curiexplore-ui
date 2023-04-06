import { Col, Link, Row } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';
import TitleComponent from '../title';
import BarChart from './bar-chart';
import useFetchData from './hooks/useFetchDataThematics';
import getLabel from '../../utils/getLabel';

export default function ThematicsChart({ iso2, iso3 }) {
  const { data } = useFetchData(iso2);
  const subTitle = (
    <>
      Requête de recherche effectuée dans
      &nbsp;
      <Link href="https://openalex.org/" target="_blank">
        OpenAlex
      </Link>
    </>
  );
  return (
    <>
      <Row className="fr-mt-1w">
        <Col n="12">
          <TitleComponent
            icon="ri-bar-chart-fill"
            title={`Principaux domaines scientifiques de travail commun entre le pays "${getLabel(iso3)}" et la France.`}
            as="h4"
            look="h4"
            subTitle={subTitle}
          />
        </Col>
      </Row>
      <Row>
        <Col n="12">
          <BarChart
            categoriesText="Domaines scientifiques"
            data={data}
            height="400px"
            slice={20}
            type="bar"
          />
        </Col>
      </Row>
    </>
  );
}

ThematicsChart.propTypes = {
  iso2: PropTypes.string.isRequired,
  iso3: PropTypes.string.isRequired,
};
