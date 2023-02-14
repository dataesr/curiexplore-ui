import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  MapContainer, Marker, TileLayer, Popup,
} from 'react-leaflet';
import {
  blueIcon, greenIcon, redIcon, orangeIcon, yellowIcon, violetIcon, greyIcon, blackIcon,
} from './icons';

const initFocus = null;
const getMarkerColorFromCategoryId = (catId) => {
  const categoryMarkerColor = [
    { id: '', icon: blueIcon },
    { id: 'NsMkU', icon: blueIcon },
    { id: 'eYx1y', icon: greenIcon },
    { id: 'IqD8w', icon: redIcon },
    { id: 'P3XZB', icon: orangeIcon },
    { id: 'C9nJr', icon: yellowIcon },
    { id: 'XQE8E', icon: violetIcon },
    { id: 'am1T8', icon: greyIcon },
    { id: 'E61CB', icon: blackIcon },

    { id: 'embassy', icon: yellowIcon },
    { id: 'campusFrance', icon: blueIcon },
    { id: 'cci', icon: blackIcon },
  ];

  return categoryMarkerColor.find((ele) => ele.id === catId).icon;
};

function getBounds(markers) {
// const getBounds = (markers) => {
  // console.log('markers', markers);
  if (markers?.length > 0) {
    let minLat = markers[0]?.addresses[0]?.gps[0] || 67.7857004;
    let maxLat = markers[0]?.addresses[0]?.gps[0] || -39.1443011;
    let minLng = markers[0]?.addresses[0]?.gps[1] || -73.3879096;
    let maxLng = markers[0]?.addresses[0]?.gps[1] || -140.8879096;

    markers.forEach((marker) => {
      const [firstAddress] = marker.addresses;
      const [gps1, gps2] = firstAddress.gps;
      if (gps1 < minLat) {
        minLat = gps1;
      }
      if (gps1 > maxLat) {
        maxLat = gps1;
      }
      if (gps2 < minLng) {
        minLng = gps2;
      }
      if (gps2 > maxLng) {
        maxLng = gps2;
      }
    });
    return [[minLat, minLng], [maxLat, maxLng]];
  }
  return [[67.7857004, -73.3879096], [-39.1443011, -140.8879096]];
// };
}

function MapWithMarkers({ data, selectedCategory, activeMarker, style }) {
  // console.log('dataMarker', data);
  const [focus, setFocus] = useState(initFocus);
  let marker = null;
  const renderMarkers = data.map((item) => {
    marker = null;
    if (!focus && activeMarker === item.tokenPaysage && item.addresses[0].gps[0]) {
      setFocus(item.addresses[0].gps);
    }
    if (item?.addresses && item.addresses[0]?.gps.length === 2) {
      marker = (
        <Marker
          position={item.addresses[0].gps}
          icon={getMarkerColorFromCategoryId(selectedCategory || (item.membershipCategories?.length > 0 ? item.membershipCategories[0] : ''))}
          key={item.nameFr}
        >
          <Popup>
            <p>
              {item.nameFr}
            </p>
          </Popup>
        </Marker>
      );
    }
    return marker;
  });

  useEffect(() => {
    if (focus || !activeMarker) {
      setFocus(null);
    }
  }, [focus, setFocus, activeMarker]);

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
  activeMarker: '',
  data: [],
  selectedCategory: '',
  style: { height: '350px', width: '100%' },
};

MapWithMarkers.propTypes = {
  activeMarker: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  selectedCategory: PropTypes.string,
  style: PropTypes.object,
};

export default MapWithMarkers;
