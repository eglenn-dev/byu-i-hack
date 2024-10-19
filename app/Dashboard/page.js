// pages/map.js
import MapComponent from "../../components/Map";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MapPage = () => {
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Accessing the API key from environment variables

  return (
    <div>
      <Header />
      <MapComponent apiKey={API_KEY} />
      <Footer />
    </div>
  );
};

export default MapPage;
