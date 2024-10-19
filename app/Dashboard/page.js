// pages/map.js
import MapComponent from "./Map";

const MapPage = () => {
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Accessing the API key from environment variables

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapComponent apiKey={API_KEY} /> {/* Render the MapComponent directly */}
    </div>
  );
};

export default MapPage;
