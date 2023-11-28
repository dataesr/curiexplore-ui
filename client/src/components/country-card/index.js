import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MapContainer } from 'react-leaflet';

import { Title } from '@dataesr/react-dsfr';
import CountryMap from '../country-map';

export default function CountryCard({ color, description, fillColor, isoCode, title }) {
  return (
    <div className="fr-card fr-enlarge-link fr-card--sm fr-card--no-border fr-card--grey">
      <div className="fr-card__header">
        <div className="fr-card__img">
          <div aria-hidden>
            <MapContainer
              zoomControl={false}
              scrollWheelZoom={false}
              attributionControl={false}
              style={{
                height: '150px',
                backgroundColor: color,
                position: 'relative',
              }}
            >
              <CountryMap isoCode={isoCode} color={color} fillColor={fillColor} hasCapital={false} />
            </MapContainer>
          </div>
        </div>
      </div>
      <div className="fr-card__body">
        <div className="fr-card__content">
          <Title as="h3" className="fr-card__title">
            <Link className="fr-card__link fr-link--md" to={`/pays/${isoCode}`} aria-label={`Lien vers ${title}`}>
              {title}
            </Link>
          </Title>
          <div className="fr-card__desc">
            {description}
          </div>
        </div>
      </div>
      <span className="ri-xl icon-left ds-fr--v-middle ri-arrow-right-line ds-fr-card-icon" aria-label="Flèche vers la droite" />
    </div>
  );
}

CountryCard.defaultProps = {
  color: '#21ab8e',
  description: '',
  fillColor: '#34bab5',
};
CountryCard.propTypes = {
  color: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.node, PropTypes.object, PropTypes.string]),
  fillColor: PropTypes.string,
  isoCode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
