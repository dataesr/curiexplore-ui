import PropTypes from 'prop-types';
import { Badge, BadgeGroup } from '@dataesr/react-dsfr';

export default function PopulationCard({
  badgeLabel,
  indicator,
  description,
}) {
  return (
    <div className="fr-card fr-card--no-border fr-card--shadow">
      <div className="fr-card__body">
        <div className="fr-card__content">
          <BadgeGroup>
            <Badge text={badgeLabel} />
          </BadgeGroup>
          {indicator}
          &nbsp;
          <div className="text-center">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}

PopulationCard.propTypes = {
  badgeLabel: PropTypes.string,
  indicator: PropTypes.string,
  description: PropTypes.string,
};

PopulationCard.defaultProps = {
  badgeLabel: null,
  indicator: null,
  description: null,
};
