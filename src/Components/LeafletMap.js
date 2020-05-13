import React, { useState } from 'react';
import Leaflet from 'leaflet';
import Control from 'react-leaflet-control';
import { Map, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

Leaflet.Icon.Default.imagePath = '../../node_modules/leaflet';

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const LeafletMap = ({ lat, lon, setMapCoord, setSearchType, language }) => {
  const position = [lat, lon];
  const [zoom, setZoom] = useState(10);
  const handleClick = e => {
    setMapCoord(e.latlng);
    setSearchType('map');
    setZoom(e.target.getZoom());
  };
  return (
    <Map
      className="h-72 lg:h-104 w-full mx-auto overflow-hidden"
      center={position}
      zoom={zoom}
      onclick={handleClick}
    >
      <TileLayer
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        maxZoom={18}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        id="mapbox/streets-v11"
        tileSize={512}
        zoomOffset={-1}
        accessToken={process.env.REACT_APP_MAPBOX_KEY}
      />
      <Marker position={position}></Marker>
      <Control position="topright">
        <div className="map-info-box bg-gray-700 bg-opacity-75 p-2 rounded-lg font-display text-gray-200 text-xs font-semibold text-center lg:max-w-full">
          {language === 'en' ? (
            <p>tap to check weather in new location</p>
          ) : (
            <p>dotknij, żeby sprawdzić pogodę w nowym miejscu</p>
          )}
        </div>
      </Control>
    </Map>
  );
};

export default LeafletMap;
