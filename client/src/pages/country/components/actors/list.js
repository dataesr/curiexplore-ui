import PropTypes from 'prop-types';
import { Row, Col, Title, Badge, Icon } from '@dataesr/react-dsfr';
import { v4 as uuidv4 } from 'uuid';
import ActorCard from '../../../../components/actor-card';

function List({ actors, categoriesLabels }) {
  const sortedActors = actors.sort((a, b) => {
    if (a.displayName.toLowerCase() < b.displayName.toLowerCase()) { return -1; }
    if (a.displayName.toLowerCase() > b.displayName.toLowerCase()) { return 1; }
    return 0;
  });

  return (
    <>
      <Row className="fr-pt-3w">
        <Col>
          <Title as="h3">
            <Icon name="ri-file-list-line" />
            Liste des acteurs
            &nbsp;
            <Badge text={`${actors.length}`} colorFamily="green-menthe" />
          </Title>
        </Col>
      </Row>
      <Row gutters>
        {sortedActors.map((actor) => (
          <Col n="6" key={uuidv4()}>
            <ActorCard
              categories={actor?.curieCategories.map((catId) => (categoriesLabels.find((el) => el.id === catId)?.shortLabel))}
              title={actor.displayName}
              url={`./${actor.id}`}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

List.propTypes = {
  actors: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoriesLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default List;
