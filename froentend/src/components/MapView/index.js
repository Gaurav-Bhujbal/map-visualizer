import "./index.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const apiStatusConstants = {
  initial: "INITAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCEESS",
  failure: "FAILURE",
};

const MapView = () => {
  const {id} = useParams();

  console.log(id)
  const lat = 28.6139; // Example: New Delhi
  const lng = 77.209;
  const position = [lat, lng];

  const [locationData, setLocationData] = useState({});


  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className="map-view-bg-container">
      <div className="map-view-body">
        <div className="location-text-conatiner">
          <h1>Location: Mumbai</h1>
        </div>

        <MapContainer center={position} zoom={10} className="leaflet-container">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position} icon={customIcon}>
            <Popup>📍 Welcome to New Delhi!</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
