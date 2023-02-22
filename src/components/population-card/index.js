import PropTypes from 'prop-types';
import { Badge } from '@dataesr/react-dsfr';

export default function PopulationCard({
  badgeLabel,
  description,
  title,
}) {
  return (
    <div className="fr-card fr-enlarge-link fr-card--sm fr-card--no-border fr-card--grey ">
      <div className="fr-card__body">
        <div className="fr-card__content fr-pb-1w">
          <p className="fr-card__title">
            {title}
            {' '}
            <Badge text={badgeLabel} />
          </p>
          <div className="fr-card__desc text-center">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}

PopulationCard.propTypes = {
  badgeLabel: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
};

PopulationCard.defaultProps = {
  badgeLabel: null,
  description: null,
  title: null,
};
