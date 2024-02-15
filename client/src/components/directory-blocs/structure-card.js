import { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { Modal, ModalTitle, ModalContent } from '@dataesr/dsfr-plus';
import {
  Button,
  Col,
  Container,
  Icon,
  Row,
  Text,
  Title,
} from '@dataesr/react-dsfr';

function AddressCard({ address, displayName }) {
  return (
    <div className="fr-card fr-card--grey fr-mb-2w">
      <div className="fr-card__body">
        <div className="fr-card__content">
          <ul>
            <li>
              <Text as="h2">
                <Icon name="ri-map-pin-line" size="xl">
                  <strong>{displayName}</strong>
                </Icon>
              </Text>
              <div className="fr-pt-3w">
                {address.address && <Text className="d-inline">{address.address}</Text>}
                <br />
                {address.city && <Text className="d-inline" bold>{address.city}</Text>}
              </div>
              <div>
                {address.phonenumber && (
                  <Text className="d-inline">
                    <Icon name="ri-phone-fill">
                      {address.phonenumber}
                    </Icon>
                  </Text>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

AddressCard.propTypes = {
  address: PropTypes.object.isRequired,
  displayName: PropTypes.string.isRequired,
};

export default function StructureCard({ data, type, website }) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const labels = {};
  switch (type) {
  case 'embassy':
    labels.cardTitle = 'Ambassade de France';
    labels.modalTitle = 'Ambassades de France';
    labels.typeLabel = 'ambassades de France';
    break;
  case 'campusFrance':
    labels.cardTitle = 'Campus France';
    labels.modalTitle = 'Campus France';
    labels.typeLabel = 'Campus France';
    break;
  case 'cci':
    labels.cardTitle = "Chambres de commerce et d'industrie";
    labels.modalTitle = "Chambres de commerce et d'industrie";
    labels.typeLabel = "chambres de commerce et d'industrie";
    break;
  default:
    labels.cardTitle = null;
  }

  const onOpenModalHandler = () => {
    const content = data.map((el) => (
      <AddressCard address={el.currentLocalisation} displayName={el.displayName} />
    ));
    setModalContent(
      <div>
        {content}
      </div>,
    );
    setShowModal(true);
  };

  return (
    <>
      <Container className={`fr-card fr-card--grey ${type}-border-card fr-pb-1w`}>
        <Row className="fr-pt-1w">
          <Col>
            <Title as="h2" look="h4">{labels.cardTitle}</Title>
          </Col>
          {website ? (
            <Col n="4" className="text-right">
              <Button tertiary>
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                >
                  Voir le site
                </a>
              </Button>
            </Col>
          ) : ''}
        </Row>
        <Row>
          <Col>
            {data?.length === 1 && (
              <>
                <div>
                  <i>
                    <Text className="d-inline">
                      {data[0].currentLocalisation.address}
                    </Text>
                    {' - '}
                    <Text className="d-inline" bold>
                      {data[0].currentLocalisation.city}
                    </Text>
                  </i>
                </div>
                {data[0].currentLocalisation.phonenumber && (
                  <Text className="d-inline">
                    <Icon name="ri-phone-fill">
                      {data[0].currentLocalisation.phonenumber}
                    </Icon>
                  </Text>
                )}
              </>
            )}
            {data?.length > 1 && (
              <div className="fr-mb-1w">
                <Button secondary onClick={() => onOpenModalHandler()}>
                  {`Voir les ${data.length} ${labels.typeLabel}`}
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <Modal isOpen={showModal} size="lg" hide={() => setShowModal(false)}>
        <ModalTitle>{labels.modalTitle}</ModalTitle>
        <ModalContent>{modalContent}</ModalContent>
      </Modal>
    </>
  );
}
StructureCard.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string,
  website: PropTypes.string,
};

StructureCard.defaultProps = {
  type: PropTypes.string,
  website: PropTypes.string,
};
