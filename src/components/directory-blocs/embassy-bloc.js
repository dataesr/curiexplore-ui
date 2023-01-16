import { Row, Col, Title } from '@dataesr/react-dsfr';
import './annuaire.scss';
import PropTypes from 'prop-types';
import StructureCard from './structure-card';

function EmbassyBloc({ data, website }) {
  if (data.length === 0) return null;
  return (
    <Row>
      {data.map(({ currentLocalisation }) => (
        <Col>
          <StructureCard
            address={currentLocalisation.address}
            city={currentLocalisation.city}
            country={currentLocalisation.country}
            link={currentLocalisation.link}
            postalCode={currentLocalisation.postalCode}
            phoneNumber={currentLocalisation.telephone}
            type="embassy"
            website={website}
          />
        </Col>
      ))}
    </Row>
  );
}
export default EmbassyBloc;
EmbassyBloc.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  website: PropTypes.string,
};
EmbassyBloc.defaultProps = {
  data: PropTypes.array,
  website: PropTypes.string,

};
