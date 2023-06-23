import { Col, Link, Row, Text } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';
import TitleComponent from '../title';
import BarChart from './bar-chart';
import useFetchData from './hooks/useFetchDataInstitutions';
import getLabel from '../../utils/getLabel';

const { REACT_APP_OPENALEX_RANGE } = process.env;

export default function InstitutionsChart({ iso2, iso3 }) {
  const { data } = useFetchData(iso2);
  const sliceNumber = 15;
  const subTitle = (
    <Text>
      Requête de recherche effectuée dans
      &nbsp;
      <Link href="https://openalex.org/" target="_blank">
        OpenAlex
      </Link>
    </Text>
  );
  return (
    <>
      <Row>
        <Col n="12">
          <TitleComponent
            icon="ri-bar-chart-horizontal-fill"
            title={`Top ${sliceNumber} des institutions les plus citées dans les publications communes entre le pays "${getLabel(iso3)}" et la France (${REACT_APP_OPENALEX_RANGE})`}
            as="h4"
            look="h4"
            subTitle={subTitle}
            betaBadge
          />
        </Col>
      </Row>
      <Row className="fr-mb-3w">
        <Col n="12">
          <BarChart
            categoriesText="Institutions correspondant à l'analyse de l'affiliation d'OpenAlex"
            data={data}
            height="400px"
            slice={sliceNumber}
            type="bar"
          />
        </Col>
      </Row>
    </>
  );
}

InstitutionsChart.propTypes = {
  iso2: PropTypes.string.isRequired,
  iso3: PropTypes.string.isRequired,
};
