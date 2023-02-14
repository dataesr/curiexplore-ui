import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { Button, Col, Row, Modal, ModalContent, ModalTitle } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';
import { v4 as uuidV4 } from 'uuid';

import Chart from './chart';
import Filters from './filters';
import { GraphContainer } from '../../../../components/graph';

export default function ChartComponents({ charts, isoCode }) {
  const contextData = useOutletContext();
  const dataCounrty = contextData['curiexplore-pays'];
  const bordersIsoCodes = dataCounrty[0].fields.borders || [];
  const [isoCodes, setIsoCodes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const onChangeFilters = (newIsoCodes) => {
    setIsoCodes(newIsoCodes);
  };

  return (
    <GraphContainer>
      <Row>
        <Col>
          <Button onClick={() => setShowModal(true)}>
            Comparer avec d'autres pays
          </Button>
        </Col>
      </Row>
      <Row>
        {charts.map((chart) => (
          <Chart key={uuidV4()} data={chart} isoCodes={isoCodes.concat([isoCode])} />
        ))}
      </Row>
      <Modal isOpen={showModal} size="lg" hide={() => setShowModal(false)}>
        <ModalTitle>Sélection d'un ou plusieurs pays</ModalTitle>
        <ModalContent>
          <Filters
            bordersIsoCodes={bordersIsoCodes.split(',')}
            currentIsoCode={isoCode}
            selectedIsoCodes={isoCodes}
            onChangeFilters={onChangeFilters}
          />
        </ModalContent>
      </Modal>
    </GraphContainer>
  );
}

ChartComponents.propTypes = {
  charts: PropTypes.array.isRequired,
  isoCode: PropTypes.string.isRequired,
};
