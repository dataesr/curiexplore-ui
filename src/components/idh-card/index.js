import { Icon } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';

export default function IDHCard({ data }) {
  return (
    <div className="fr-card fr-enlarge-link fr-card--sm fr-card--no-border fr-card--grey">
      <div className="fr-card__header">
        <div className="fr-card__img">
          <Icon name="ri-government-line" size="5x" />
        </div>
      </div>
      <div className="fr-card__body">
        <div className="fr-card__content">
          <p className="fr-card__title">
            {data.value}
          </p>
          <div className="fr-card__desc text-center">
            {data.label}
          </div>
        </div>
      </div>
      <span className="ri-xl icon-left ds-fr--v-middle ri-arrow-right-line ds-fr-card-icon" aria-hidden="false" />
    </div>
  );
}

IDHCard.propTypes = {
  data: PropTypes.string.isRequired,
};
