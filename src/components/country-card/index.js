import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MapContainer } from 'react-leaflet';
import CountryMap from '../country-map';

export default function CountryCard({ isoCode, title, description }) {
  return (
    <div className="fr-card fr-enlarge-link fr-card--sm fr-card--no-border fr-card--grey">
      <div className="fr-card__header">
        <div className="fr-card__img">
          <MapContainer
            zoomControl={false}
            scrollWheelZoom={false}
            attributionControl={false}
            style={{
              height: '150px',
              backgroundColor: '#21ab8e',
              position: 'relative',
            }}
          >
            <CountryMap isoCode={isoCode} color="#21ab8e" fillColor="#34bab5" hasCapital={false} />
          </MapContainer>
        </div>
      </div>
      <div className="fr-card__body">
        <div className="fr-card__content">
          <p className="fr-card__title">
            <Link className="fr-card__link fr-link--md" to={`/pays/${isoCode}`}>{title}</Link>
          </p>
          <div className="fr-card__desc">
            {description}
          </div>
        </div>
      </div>
      <span className="ri-xl icon-left ds-fr--v-middle ri-arrow-right-line ds-fr-card-icon" aria-hidden="false" />
    </div>
  );
}

CountryCard.defaultProps = {
  description: '',
};
CountryCard.propTypes = {
  isoCode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
};
