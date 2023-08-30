import { Badge, BadgeGroup } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';

export default function PopulationCard({
  badgeLabel,
  description,
  indicator,
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
  description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  indicator: PropTypes.object,
};

PopulationCard.defaultProps = {
  badgeLabel: null,
  description: null,
  indicator: null,
};
