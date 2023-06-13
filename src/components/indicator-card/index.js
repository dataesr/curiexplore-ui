import PropTypes from 'prop-types';
import { Badge, BadgeGroup } from '@dataesr/react-dsfr';

export default function IndicatorCard({
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

IndicatorCard.propTypes = {
  badgeLabel: PropTypes.string,
  description: PropTypes.string,
  indicator: PropTypes.number,
};

IndicatorCard.defaultProps = {
  badgeLabel: null,
  description: null,
  indicator: null,
};
