import PropTypes from 'prop-types';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import worldGeoJSON from '../../../../assets/data/custom.geo.json';
import capitalsList from '../../../../assets/data/capitalsList.json';

import 'leaflet/dist/leaflet.css';
import './country-map.css';

const getIcon = (color = '#0078f3') => L.divIcon({
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
    <path fill="none" d="M0 0h24v24H0z"/>
      <g fill=${color}>
        <path d="M18.364 17.364L12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zM12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
      </g>
    </svg>
  `,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

export default function CountryMap({ isoCode, color, fillColor, hasCapital, markers }) {
  const map = useMap();
  const countryGeoJSON = {
    ...worldGeoJSON,
    features: worldGeoJSON.features.filter((el) => (el.properties.iso_a3 === isoCode)),
  };
  const allCountriesGeoJSON = {
    ...worldGeoJSON,
    features: worldGeoJSON.features.filter((el) => (el.properties.iso_a3 !== isoCode)),
  };
  const defaultStyle = { color, weight: 1, fillOpacity: 1, fillColor };
  L.geoJson(allCountriesGeoJSON, { style: defaultStyle }).addTo(map);
  const mapper = L
    .geoJson(countryGeoJSON, { style: { ...defaultStyle, fillColor: '#fff' } })
    .addTo(map)
    .getBounds();
  if (mapper) map.fitBounds(mapper);
  if (hasCapital) {
    const { city: capitalName, lat, lng } = capitalsList.find(
      (capital) => (capital.iso3 === isoCode && capital.capital === 'primary'),
    );
    L
      .circle([lat, lng], { color: 'black', radius: 200, weight: 5 })
      .bindTooltip(capitalName, {
        permanent: true,
        direction: 'center',
        className: 'label-style',
      })
      .addTo(map);
  }
  if (markers?.length) {
    markers.map((marker) => L.marker([marker.lat, marker.lng], { icon: getIcon(marker.color) }).addTo(map));
  }
  return null;
}
CountryMap.defaultProps = {
  color: '#FFCA00',
  fillColor: '#FCD17B',
  hasCapital: true,
  markers: null,
};

CountryMap.propTypes = {
  isoCode: PropTypes.string.isRequired,
  markers: PropTypes.object,
  color: PropTypes.string,
  fillColor: PropTypes.string,
  hasCapital: PropTypes.bool,
};
