import { InfoWindow, useMap } from "@vis.gl/react-google-maps";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import PinMarker from "./PinMarker";

const ClusteredPinMarkers = ({ pins }) => {
  const [markers, setMarkers] = useState({});
  const [selectedTreeKey, setSelectedTreeKey] = useState(null);

  const selectedTree = useMemo(() => {
    return pins && selectedTreeKey
      ? pins.find((t) => t.key === selectedTreeKey)
      : null;
  }, [pins, selectedTreeKey]);

  // Create the MarkerClusterer once the map is available
  const map = useMap();
  const clusterer = useMemo(() => {
    if (!map) return null;

    return new MarkerClusterer({ map });
  }, [map]);

  // Update markers when the MarkerClusterer or markers change
  useEffect(() => {
    if (!clusterer) return;

    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  // Track markers currently on the map
  const setMarkerRef = useCallback((marker, key) => {
    setMarkers((currentMarkers) => {
      if (
        (marker && currentMarkers[key]) ||
        (!marker && !currentMarkers[key])
      ) {
        return currentMarkers;
      }

      if (marker) {
        return { ...currentMarkers, [key]: marker };
      } else {
        const { [key]: _, ...newMarkers } = currentMarkers;
        return newMarkers;
      }
    });
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedTreeKey(null);
  }, []);

  const handleMarkerClick = useCallback((tree) => {
    setSelectedTreeKey(tree.key);
  }, []);

  return (
    <>
      {pins.map((pin, index) => (
        <PinMarker
          key={pin.key || `fallback-key-${index}`} // Ensure uniqueness
          pin={pin}
          onClick={handleMarkerClick}
          setMarkerRef={setMarkerRef}
        />
      ))}

      {selectedTreeKey && (
        <InfoWindow
          anchor={markers[selectedTreeKey]}
          onCloseClick={handleInfoWindowClose}
        >
          {selectedTree?.name}
        </InfoWindow>
      )}
    </>
  );
};

export default ClusteredPinMarkers;
