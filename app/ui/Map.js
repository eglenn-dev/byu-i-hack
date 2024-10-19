"use client"; // This directive ensures the component runs in the client-side context

import { APIProvider, Map } from "@vis.gl/react-google-maps";

const MapComponent = ({
  apiKey,
  lat = 43.8255195,
  lng = -111.7940202,
  pins,
}) => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {" "}
      {/* Full viewport height */}
      <APIProvider apiKey={apiKey}>
        <Map
          style={{ width: "100%", height: "100%" }}
          // defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultCenter={{ lat, lng }}
          defaultZoom={14}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        />
      </APIProvider>
    </div>
  );
};

export default MapComponent;
