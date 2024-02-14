import PropTypes from 'prop-types';
import { useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import worldGeoJSON from '../../../assets/data/custom.geo.json';

import 'leaflet/dist/leaflet.css';

export default function WorldMap({ region, color, fillColor }) {
  const navigate = useNavigate();
  const map = useMap();
  const onEachFeature = (feature, layer) => {
    layer.bindTooltip(feature.properties?.name_fr || '');
    layer.on({
      mouseover: () => { layer.setStyle({ fillColor: '#fff' }); },
      mouseout: () => { if (feature.properties.region_wb !== region) { layer.setStyle({ fillColor }); } },
      click: () => { if (feature.properties.iso_a3 !== 'FRA') { navigate(`/pays/${feature.properties.iso_a3}`); } },
    });
  };

  const regionGeoJSON = {
    ...worldGeoJSON,
    features: worldGeoJSON.features.filter((el) => (el.properties.region_wb === region)),
  };

  const allCountriesGeoJSON = {
    ...worldGeoJSON,
    features: worldGeoJSON.features.filter((el) => (el.properties.region_wb !== region)),
  };

  const defaultStyle = { color, weight: 1, fillOpacity: 1, fillColor };
  L.geoJson(allCountriesGeoJSON, { style: defaultStyle, onEachFeature }).addTo(map);
  L.geoJson(regionGeoJSON, { style: { ...defaultStyle, fillColor: '#ffffff' }, onEachFeature }).addTo(map);
  return null;
}

WorldMap.defaultProps = {
  region: null,
  color: '#efcb3a',
  fillColor: '#efcb3a',
};

WorldMap.propTypes = {
  region: PropTypes.string,
  color: PropTypes.string,
  fillColor: PropTypes.string,
};
