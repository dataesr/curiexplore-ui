import { useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import { Button, Col, Row, Modal, ModalContent, ModalTitle, Icon } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';

import Chart from './chart';
import Filters from './filters';
import { GraphContainer } from '../../../../components/graph';

export default function ChartComponents({ charts }) {
  const { isoCode } = useParams();

  const contextData = useOutletContext();
  const dataCountry = contextData['curiexplore-pays'].find((country) => country.fields.iso3 === isoCode);
  const bordersIsoCodes = dataCountry.fields.borders?.split(',') || [];
  const [isoCodes, setIsoCodes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // seulement si au moins 1 graph d'affiché
  const onChangeFilters = (newIsoCodes) => {
    setIsoCodes(newIsoCodes);
  };

  return (
    <GraphContainer>
      {(showFilters) && (
        <Row gutters className="fr-mt-1w">
          <Col className="fr-btns-group">
            <Button onClick={() => setShowModal(true)} className="fr-btn text-center">
              <Icon name="ri-arrow-down-circle-line" />
              Comparer avec d'autres pays
              &nbsp;
              <Icon name="ri-arrow-down-circle-line" />
            </Button>
          </Col>
        </Row>
      )}
      <Row gutters>
        {charts.map((chart) => (
          <Chart
            data={chart}
            otherCodes={isoCodes}
            countryCode={isoCode}
            hasDataHandler={setShowFilters}
          />
        ))}
      </Row>
      <Modal isOpen={showModal} size="lg" hide={() => setShowModal(false)}>
        <ModalTitle>Sélection d'un ou plusieurs pays</ModalTitle>
        <ModalContent>
          <Filters
            bordersIsoCodes={bordersIsoCodes}
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
};
