"use client"; // Ensures the component runs in the client-side context

import React, { useCallback, useEffect, useState, useMemo } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import ControlPanel from "./ControlPanel"; // Ensure ControlPanel is used if needed
import { loadPinsDataset, getCategories } from "./pins";
import ClusteredPinMarkers from "./ClusteredPinMarkers";

const nightModeMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

const MapComponent = ({ apiKey, lat = 43.8255195, lng = -111.7940202 }) => {
  const [pins, setPins] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Load pins on mount
    loadPinsDataset()
      .then((data) => {
        setPins(data);
        setCategories(getCategories(data));
      })
      .catch((error) => {
        console.error("Error loading pins:", error);
      });
  }, []);

  // Filter pins based on the selected category
  const filteredPins = useMemo(() => {
    if (!selectedCategory) {
      return pins;
    }
    return pins.filter((pin) => pin.category === selectedCategory);
  }, [pins, selectedCategory]);

  const handleCategoryChange = useCallback((e) => {
    setSelectedCategory(e.target.value || null);
  }, []);

  return (
    <div className="w-screen h-[400px]">
      <APIProvider apiKey={apiKey}>
        <Map
          mapId={"2b7e317fcb176699"}
          style={{ width: "100%", height: "100%" }}
          defaultCenter={{ lat, lng }}
          defaultZoom={14}
          gestureHandling={"greedy"}
          styles={nightModeMapStyles}
          disableDefaultUI
        >
          {/* Pass the filtered pins to ClusteredPinMarkers to display them */}
          <ClusteredPinMarkers pins={filteredPins} />
        </Map>
      </APIProvider>

      <div className="w-screen text-center mt-2">
        <div className="inline-block p-[2px] rounded-md bg-gradient-to-r from-blue-500 to-green-500 md:top-5 absolute">
          <select
            className="border-2 border-transparent bg-slate-900 text-white rounded-md p-2"
            onChange={handleCategoryChange}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.key} value={category.key}>
                {category.label} ({category.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      <ControlPanel
        categories={categories}
        onCategoryChange={handleCategoryChange} // Ensure this function is used correctly
      />
    </div>
  );
};

export default MapComponent;
