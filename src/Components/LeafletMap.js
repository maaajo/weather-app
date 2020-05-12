import React, { useState } from 'react';
import Leaflet from 'leaflet';
import { Map, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

Leaflet.Icon.Default.imagePath = '../../node_modules/leaflet';

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const LeafletMap = ({ lat, lon, setMapCoord, setSearchType }) => {
  const position = [lat, lon];
  const [zoom, setZoom] = useState(6);
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
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}></Marker>
    </Map>
  );
};

export default LeafletMap;
