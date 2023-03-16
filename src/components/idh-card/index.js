import { Icon } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';

export default function IDHCard({ group }) {
  return (
    <div className="fr-card fr-enlarge-link fr-card--sm fr-card--no-border fr-card--grey">
      <div className="fr-card__header">
        <div className="fr-card__img">
          <Icon name="ri-government-line" size="10x" />
        </div>
      </div>
      <div className="fr-card__body">
        <div className="fr-card__content">
          <p className="fr-card__title">
            {group}
          </p>
          <div className="fr-card__desc">
            "description"
          </div>
        </div>
      </div>
      <span className="ri-xl icon-left ds-fr--v-middle ri-arrow-right-line ds-fr-card-icon" aria-hidden="false" />
    </div>
  );
}

IDHCard.propTypes = {
  group: PropTypes.string.isRequired,
};
