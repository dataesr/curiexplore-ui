import { Button, Col, Row, Modal, ModalContent, ModalTitle, Icon } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import Chart from './chart';
import { GraphContainer } from '../../../../components/graph';
import Title from '../../../../components/title';
import Filters from './filters';

export default function ChartComponents({ charts, title, icon }) {
  const { isoCode } = useParams();
  const contextData = useOutletContext();
  const dataCountry = contextData['curiexplore-pays'].find((country) => country.fields.iso3 === isoCode);
  const bordersIsoCodes = dataCountry.fields.borders?.split(',') || [];
  const [isoCodes, setIsoCodes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // seulement si au moins 1 graph d'affiché
  const onChangeFilters = (newIsoCodes) => setIsoCodes(newIsoCodes);

  return (
    <GraphContainer>
      {(showFilters) && (
        <>
          <Title
            as="h4"
            icon={icon}
            look="h4"
            title={title}
          />
          <Row gutters>
            <Col className="fr-btns-group">
              <Button onClick={() => setShowModal(true)} className="fr-btn text-center">
                <Icon name="ri-arrow-down-circle-line" />
                Comparer avec d'autres pays
                &nbsp;
                <Icon name="ri-arrow-down-circle-line" />
              </Button>
            </Col>
          </Row>
        </>
      )}
      <Row gutters>
        {charts.map((chart) => (
          <Chart
            countryCode={isoCode}
            data={chart}
            hasDataHandler={setShowFilters}
            otherCodes={isoCodes}
          />
        ))}
      </Row>
      <Modal isOpen={showModal} size="lg" hide={() => setShowModal(false)}>
        <ModalTitle>Sélection d'un ou plusieurs pays</ModalTitle>
        <ModalContent>
          <Filters
            bordersIsoCodes={bordersIsoCodes}
            currentIsoCode={isoCode}
            onChangeFilters={onChangeFilters}
            selectedIsoCodes={isoCodes}
          />
        </ModalContent>
      </Modal>
    </GraphContainer>

  );
}

ChartComponents.propTypes = {
  charts: PropTypes.array.isRequired,
  title: PropTypes.string,
  icon: PropTypes.string,
};

ChartComponents.defaultProps = {
  title: null,
  icon: null,
};
