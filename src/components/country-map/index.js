import propTypes from 'prop-types';
import { MapContainer, GeoJSON, Circle, Tooltip, useMap } from 'react-leaflet';

import worldGeoJSON from '../../assets/data/custom.geo.json';
import capitalsList from '../../assets/data/capitalsList.json';

import 'leaflet/dist/leaflet.css';
import './country-map.css';

function SetMap({ isoCode, color, fillColor }) {
  const map = useMap();
  map.setStyle({ backgroundColor: color });
  const { city: capitalName, lat, lng } = capitalsList.find(
    (capital) => (capital.iso3 === isoCode && capital.capital === 'primary'),
  );
  const capitalPos = [lat, lng];

  if (!capitalName) { return null; }
  const geoJSON = (
    <GeoJSON
      data={worldGeoJSON}
      style={(feature) => ((feature.properties.adm0_a3 === isoCode) ? ({
        color,
        weight: 0.9,
        fillOpacity: 1,
        fillColor: 'white',
      }) : ({
        color,
        weight: 1,
        fillOpacity: 1,
        fillColor,
      }))}
    />
  );
  return null;
}
SetMap.defaultProps = {
  markers: [],
};

SetMap.propTypes = {
  markers: PropTypes.array,
};

export default function CountryMap({ height, zoom, display }) {
  return (
    <MapContainer
      center={[10, 50]}
      zoom={zoom}
      zoomControl={false}
      scrollWheelZoom={false}
      attributionControl={false}
      style={{ height }}
    />
  );
}

CountryMap.defaultProps = {
  zoom: 4,
  display: ',',
  height: '400px',
  color: '#FFCA00',
  fillColor: '#fcd17b',
};

CountryMap.propTypes = {
  height: propTypes.string,
  isoCode: propTypes.string.isRequired,
  zoom: propTypes.bool,
  display: propTypes.string,
  color: propTypes.string,
  fillColor: propTypes.string,
};
