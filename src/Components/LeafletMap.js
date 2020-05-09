import React, { useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';

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
