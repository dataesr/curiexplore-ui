import { Badge, Text } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';

export default function PopulationCard({
  badgeLabel,
  description,
  indicator,
}) {
  return (
    <div className="fr-card fr-card--no-border fr-card--shadow text-center fr-card-container">
      <div className="fr-card__content">
        <Text as="h3" className="not-bold">
          {description}
        </Text>
        <div className="badge-container" title="Année concernée">
          <Badge text={badgeLabel} />
        </div>
        <p>
          {indicator}
        </p>
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
