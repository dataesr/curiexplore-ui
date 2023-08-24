import { Row, Col, Title } from '@dataesr/react-dsfr';
import './annuaire.scss';
import PropTypes from 'prop-types';
import StructureCard from './structure-card';

function CampusFrance({ data }) {
  return (
    <>
      <h2 className="structureName"> Les Campus France</h2>
      <Row className="container" gutters>
        {data.map(({ currentLocalisation }) => (
          <Col>
            <StructureCard
              address={currentLocalisation.address}
              city={currentLocalisation.city}
              country={currentLocalisation.country}
              link={currentLocalisation.link}
              postalCode={currentLocalisation.postalCode}
              phoneNumber={currentLocalisation.telephone}
              type="campus-france"
              website={currentLocalisation.website}
            />
          </Col>
        ))}
      </Row>
    </>

  );
}
export default CampusFrance;
CampusFrance.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
};
CampusFrance.defaultProps = {
  data: PropTypes.array,
};
