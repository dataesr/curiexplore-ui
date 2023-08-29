import PropTypes from 'prop-types';
import { Row, Title } from '@dataesr/react-dsfr';

export default function GraphTitle({ children }) {
  return (
    <Row fluid className="graph-title">
      <Title size="lead" bold>
        {children}
      </Title>
    </Row>
  );
}

GraphTitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};
