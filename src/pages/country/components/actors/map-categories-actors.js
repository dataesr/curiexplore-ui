import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '@dataesr/react-dsfr';

import MapWithMarkers from '../../../../components/map-with-markers';

function MapList({ actors }) {
  return (
    <Row>
      <Col>
        <MapWithMarkers
          data={actors}
        />
      </Col>
    </Row>
  );
}

MapList.propTypes = {
  actors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MapList;
