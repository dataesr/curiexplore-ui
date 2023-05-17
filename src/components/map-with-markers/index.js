/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  MapContainer, Marker, TileLayer, Popup,
} from 'react-leaflet';
import { v4 as uuidV4 } from 'uuid';
import {
  blueIcon, greenIcon, redIcon, orangeIcon, yellowIcon, violetIcon, greyIcon, blackIcon,
} from './icons';

const initFocus = null;

const getMarkerColorFromCategoryId = (iconColor) => {
  switch (iconColor) {
    case 'blue':
    case 'NsMkU':
      return blueIcon;
    case 'green':
    case 'eYx1y':
      return greenIcon;
    case 'red':
    case 'IqD8w':
      return redIcon;
    case 'orange':
    case 'P3XZB':
      return orangeIcon;
    case 'yellow':
    case 'C9nJr':
      return yellowIcon;
    case 'violet':
    case 'XQE8E':
      return violetIcon;
    case 'grey':
    case 'am1T8':
      return greyIcon;
    case 'black':
    case 'E61CB':
      return blackIcon;
    case 'embassy':
      return yellowIcon;
    case 'campusFrance':
      return blueIcon;
    case 'cci':
      return blackIcon;
    default:
      return blueIcon;
  }
};

function getBounds(markers) {
  if (markers?.length > 0) {
    let minLat = markers[0]?.gps[1] || 67.7857004;
    let maxLat = markers[0]?.gps[1] || -39.1443011;
    let minLng = markers[0]?.gps[0] || -73.3879096;
    let maxLng = markers[0]?.gps[0] || -140.8879096;

    markers.forEach((marker) => {
      const [lng, lat] = marker.gps;

      if (lat < minLat) {
        minLat = lat;
      }
      if (lat > maxLat) {
        maxLat = lat;
      }
      if (lng < minLng) {
        minLng = lng;
      }
      if (lng > maxLng) {
        maxLng = lng;
      }
    });
    return [[minLat, minLng], [maxLat, maxLng]];
  }
  return [[67.7857004, -73.3879096], [-39.1443011, -140.8879096]];
}

export default function MapWithMarkers({ data, selectedCategory, activeId, style }) {
  const [focus, setFocus] = useState(initFocus);
  let marker = null;
  const renderMarkers = data.map((item) => {
    marker = null;
    if (!focus && activeId === item.id && item.gps.length === 2) {
      setFocus(item.gps);
    }
    if (item?.gps.length === 2) {
      marker = (
        <Marker
          position={[item.gps[1], item.gps[0]]}
          icon={getMarkerColorFromCategoryId(selectedCategory || item.iconColor)}
          key={uuidV4()}
        >
          <Popup>
            <p>
              {item.label}
            </p>
          </Popup>
        </Marker>
      );
    }
    return marker;
  });

  useEffect(() => {
    if (focus || !activeId) {
      setFocus(null);
    }
  }, [focus, setFocus, activeId]);

  return (
    <div className="map-container shadow-light">
      <MapContainer
        bounds={getBounds(data)}
        center={focus}
        zoom={focus ? 16 : 10}
        style={style}
        scrollWheelZoom={false}
        attributionControl
      >
        <TileLayer
          attribution="<a href='https://www.jawg.io' target='_blank'>&copy; Jawg</a>"
          url="https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}.png?access-token=5V4ER9yrsLxoHQrAGQuYNu4yWqXNqKAM6iaX5D1LGpRNTBxvQL3enWXpxMQqTrY8"
        />
        {renderMarkers}
      </MapContainer>
    </div>
  );
}

MapWithMarkers.defaultProps = {
  activeId: '',
  data: [],
  selectedCategory: '',
  style: { height: '350px', width: '100%' },
};

MapWithMarkers.propTypes = {
  activeId: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  selectedCategory: PropTypes.string,
  style: PropTypes.object,
};
