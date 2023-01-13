import PropTypes from 'prop-types';
import { Row, Col, Title, Badge, Icon } from '@dataesr/react-dsfr';
import { v4 as uuidv4 } from 'uuid';
import ActorCard from '../../../../../components/actor-card';

function List({ actors }) {
  return (
    <>
      <Row className="fr-pt-3w">
        <Col>
          <Title as="h3">
            <Icon name="ri-file-list-line" />
            Liste des acteurs
            &nbsp;
            <Badge text={actors.length} colorFamily="green-menthe" />
          </Title>
        </Col>
      </Row>
      <Row gutters>
        {actors.map((actor) => (
          <Col n="6" key={uuidv4()}>
            <ActorCard
              categories={actor.membershipCategoriesLabels}
              title={actor.nameFr}
              url={`./${actor.tokenPaysage }`}
            />

          </Col>
        ))}
      </Row>
    </>
  );
}

List.propTypes = {
  actors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default List;
