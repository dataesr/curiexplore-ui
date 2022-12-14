import propTypes from 'prop-types';
import { MapContainer, GeoJSON, Circle, Tooltip } from 'react-leaflet';

import worldGeoJSON from '../../assets/data/custom.geo.json';
import capitalsList from '../../assets/data/capitalsList.json';

import 'leaflet/dist/leaflet.css';
import './country-map.css';

export default function CountryMap({ isoCode, height, zoom, color, fillColor }) {
  const getStyles = (feature) => {
    const defaultStyle = { color, weight: 1, fillOpacity: 1, fillColor };
    if (feature.properties.adm0_a3 === isoCode) return { ...defaultStyle, fillColor: '#fff' };
    return defaultStyle;
  };

  const { city: capitalName, lat, lng } = capitalsList.find(
    (capital) => (capital.iso3 === isoCode && capital.capital === 'primary'),
  );
  const capitalPos = [lat, lng];

  if (!capitalName) { return null; }
  return (
    <MapContainer
      center={capitalPos}
      zoom={zoom}
      zoomControl={false}
      scrollWheelZoom={false}
      attributionControl={false}
      style={{
        height,
        backgroundColor: color,
        position: 'relative',
      }}
    >
      <GeoJSON data={worldGeoJSON} style={getStyles} />
      <Circle
        center={capitalPos}
        color="black"
        radius={20}
        weight={5}
      >
        <Tooltip permanent direction="center" className="label-style">
          <span className="capital-name">{capitalName}</span>
        </Tooltip>
      </Circle>
    </MapContainer>
  );
}

CountryMap.defaultProps = {
  zoom: 4,
  height: '400px',
  color: '#FFCA00',
  fillColor: '#fcd17b',
};

CountryMap.propTypes = {
  height: propTypes.string,
  isoCode: propTypes.string.isRequired,
  zoom: propTypes.bool,
  color: propTypes.string,
  fillColor: propTypes.string,
};
