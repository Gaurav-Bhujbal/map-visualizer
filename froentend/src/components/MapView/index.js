import "./index.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Cookies from "js-cookie";

const apiStatusConstants = {
  initial: "INITAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCEESS",
  failure: "FAILURE",
};

const MapView = () => {
  const { id } = useParams();

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.inProgress);
  const [locationData, setLocationData] = useState({});

  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  //making api call for location data

  const getLocationData = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get("jwt_token");

    const url = `https://map-visualizer.onrender.com/api/map/${id}`;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    setLocationData(data);
    setApiStatus(apiStatusConstants.success);
  };

  useEffect(() => {
    getLocationData();
  }, []);

  const renderMapView = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div className="loader-container">
            <ThreeDots color="#9880ff" />
          </div>
        );
        break;
      case apiStatusConstants.success:
        const position = [locationData.lat, locationData.lng];
        return (
          <>
            <div className="location-text-conatiner">
              <h1>Location: {locationData.location}</h1>
            </div>

            <MapContainer
              center={position}
              zoom={10}
              className="leaflet-container"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={position} icon={customIcon}>
                <Popup>📍 Welcome to New Delhi!</Popup>
              </Marker>
            </MapContainer>
          </>
        );
    }
  };

  return (
    <div className="map-view-bg-container">
      <div className="map-view-body">{renderMapView()}</div>
    </div>
  );
};

export default MapView;
