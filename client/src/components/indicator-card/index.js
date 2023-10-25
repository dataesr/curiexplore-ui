import PropTypes from 'prop-types';
import { Badge, BadgeGroup, Text } from '@dataesr/react-dsfr';

export default function IndicatorCard({
  badgeLabel,
  description,
  indicator,
}) {
  return (
    <div className="fr-card fr-card--no-border fr-card--shadow text-center fr-card-container">
      <div className="fr-card__content">
        <div className="badge-container">
          <BadgeGroup>
            <Badge text={badgeLabel} className="" />
          </BadgeGroup>
        </div>
        <Text as="h3" className="not-bold">
          {description}
        </Text>
        <p className="is-bold extra-large-text">
          {indicator}
        </p>
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
