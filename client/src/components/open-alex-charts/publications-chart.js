import { Col, Link, Row, Text } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';

import BarChart from './bar-chart';
import useFetchData from './hooks/useFetchDataPublications';
import TitleComponent from '../title';
import getLabel from '../../utils/getLabel';

const { REACT_APP_OPENALEX_RANGE } = process.env;

export default function PublicationsChart({ iso2, iso3 }) {
  const { data } = useFetchData(iso2);
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
            as="h3"
            betaBadge
            icon="ri-bar-chart-fill"
            look="h4"
            subTitle={subTitle}
            title={`Evolution du nombre de publications communes dans le temps. Collaboration entre "${getLabel(iso3)}" et "France" (${REACT_APP_OPENALEX_RANGE})`}
          />
        </Col>
      </Row>
      <Row className="fr-mb-3w">
        <Col n="12">
          <BarChart
            categoriesText="Années de publication"
            data={data?.sort((a, b) => a.key - b.key)}
            height="400px"
            slice={1000}
            type="column"
          />
        </Col>
      </Row>
    </>
  );
}

PublicationsChart.propTypes = {
  iso2: PropTypes.string.isRequired,
  iso3: PropTypes.string.isRequired,
};
