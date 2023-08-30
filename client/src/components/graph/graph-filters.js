import PropTypes from 'prop-types';
import { Col, Row } from '@dataesr/react-dsfr';

export default function GraphFilters({ children }) {
  return (
    <Row fluid className="graph-filters">
      <Col n="12">
        {children}
      </Col>
    </Row>
  );
}

GraphFilters.propTypes = {
  children: PropTypes.node.isRequired,
};
