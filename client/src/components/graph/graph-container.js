import PropTypes from 'prop-types';
import { Container } from '@dataesr/react-dsfr';
import { useMemo, useState } from 'react';
import { GraphContext } from './use-graph-context';

export default function GraphContainer({ children }) {
  const [ctx, setCtx] = useState();
  const value = useMemo(() => ([ctx, setCtx]), [ctx, setCtx]);
  return (
    <Container fluid className="graph-container">
      <GraphContext.Provider value={value}>
        {children}
      </GraphContext.Provider>
    </Container>
  );
}

GraphContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
