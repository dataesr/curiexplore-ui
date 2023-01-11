import { Row, Col, Title } from '@dataesr/react-dsfr';
import './annuaire.scss';
import PropTypes from 'prop-types';
import StructureCard from './structure-card';

function EmbassyBloc({ data, website }) {
  return (
    <>
      <h2 className="structureName">Ambassade de France</h2>
      {data.length > 0 ? (
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
                type="embassy"
                website={website}
              />
            </Col>
          ))}
        </Row>
      ) : null}

    </>
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
