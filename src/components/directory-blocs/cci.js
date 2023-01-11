import { Row, Col, Title } from '@dataesr/react-dsfr';
import './annuaire.scss';
import PropTypes from 'prop-types';
import StructureCard from './structure-card';

function CCI({ data }) {
  return (
    <>
      <h2 className="structureName">Les CCI</h2>
      {data.length > 0 ? (
        <Row className="container" gutters>
          {data.map(({ currentLocalisation }) => (
            <Col>
              <StructureCard
                address={currentLocalisation.address}
                city={currentLocalisation.city}
                country={currentLocalisation.country}
                link={currentLocalisation.link}
                phoneNumber={currentLocalisation.telephone}
                postalCode={currentLocalisation.postalCode}
                type="CCI"
                website={currentLocalisation.website}
              />
            </Col>
          ))}
        </Row>
      ) : null}
    </>
  );
}

export default CCI;
CCI.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
};
CCI.defaultProps = {
  data: PropTypes.array,
};
