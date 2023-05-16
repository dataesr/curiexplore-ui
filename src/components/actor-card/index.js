import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BadgeGroup, Badge } from '@dataesr/react-dsfr';
import { v4 as uuidv4 } from 'uuid';

export default function ActorCard({
  categories,
  title,
  url,
}) {
  return (
    <div className="fr-card fr-enlarge-link fr-card--sm fr-card--no-border fr-card--grey ">
      <div className="fr-card__body">
        <div className="fr-card__content fr-pb-1w">
          <h6 className="fr-card__title">
            <Link to={url}>{title}</Link>
          </h6>
          <p className="fr-card__desc">
            <BadgeGroup>
              {categories.map((categoryLabel) => {
                if (categoryLabel === undefined) {
                  return null;
                }
                return (
                  <Badge text={categoryLabel} key={uuidv4()} />
                );
              })}
            </BadgeGroup>
          </p>
        </div>
      </div>
    </div>
  );
}

ActorCard.propTypes = {
  categories: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
