import { Col, Link, Row } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';
import TitleComponent from '../title';
import BarChart from './bar-chart';
import useFetchData from './hooks/useFetchDataPublications';
import getLabel from '../../utils/getLabel';

export default function PublicationsChart({ iso2, iso3 }) {
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
            title={`Evolution du nombre de publications communes dans le temps. Collaboration entre "${getLabel(iso3)}" et "France".`}
            as="h4"
            look="h4"
            subTitle={subTitle}
          />
        </Col>
      </Row>
      <Row>
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