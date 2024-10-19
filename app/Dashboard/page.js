// pages/map.js
import dynamic from "next/dynamic";
// import Pin from "../../lib/";

// Dynamically import the MapComponent with SSR disabled
const MapComponent = dynamic(() => import("../ui/Map"), { ssr: false });

const MapPage = () => {
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Accessing the API key from environment variables

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapComponent apiKey={API_KEY} />
    </div>
  );
};

export default MapPage;
