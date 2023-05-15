import PropTypes from 'prop-types';
import { Badge } from '@dataesr/react-dsfr';

export default function IndicatorCard({
  badgeLabel,
  description,
  title,
}) {
  return (
    <div className="fr-card fr-enlarge-link fr-card--sm fr-card--no-border fr-card--grey ">
      <div className="fr-card__body">
        <div className="fr-card__content fr-pb-1w">
          <div className="fr-card__desc">
            {title}
            &nbsp;
          </div>
          <div className="fr-card__title text-center">
            {description}
          </div>
          <div>
            <Badge text={badgeLabel} />
          </div>
        </div>
      </div>
    </div>
  );
}

IndicatorCard.propTypes = {
  badgeLabel: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
};

IndicatorCard.defaultProps = {
  badgeLabel: null,
  description: null,
  title: null,
};
