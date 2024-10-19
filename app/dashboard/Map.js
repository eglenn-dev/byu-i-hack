// "use client"; // Ensures the component runs in the client-side context

// import React, { useCallback, useEffect, useState, useMemo } from "react";
// import { APIProvider, Map as GoogleMap } from "@vis.gl/react-google-maps";
// import ControlPanel from "./ControlPanel";
// import { getCategories, loadPinsDataset, Tree } from "./pins";
// import { loadPinsDataset, getCategories } from "./pins";
// import { ClusteredPinMarkers } from "./ClusteredPinMarkers";

// const MapComponent = ({ apiKey, lat = 43.8255195, lng = -111.7940202 }) => {
//   const [pins, setPins] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     // Load pins on mount
//     loadPinsDataset().then((data) => {
//       setPins(data);
//       setCategories(getCategories(data));
//     });
//   }, []);

//   const handleCategoryChange = useCallback((e) => {
//     setSelectedCategory(e.target.value || null);
//   }, []);

//   return (
//     <div style={{ width: "100%", height: "100vh" }}>
//       <select onChange={handleCategoryChange}>
//         <option value="">All trees</option>
//         {categories.map((category) => (
//           <option key={category.key} value={category.key}>
//             {category.label} ({category.count})
//           </option>
//         ))}
//       </select>
//       <APIProvider apiKey={apiKey}>
//         <GoogleMap
//           style={{ width: "100%", height: "100%" }}
//           defaultCenter={{ lat, lng }}
//           defaultZoom={14}
//           gestureHandling={"greedy"}
//           disableDefaultUI={true}
//           // You could add markers for the pins here
//         />
//       </APIProvider>
//     </div>
//   );
// };

// export default MapComponent;

"use client"; // Ensures the component runs in the client-side context

import React, { useCallback, useEffect, useState, useMemo } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import ControlPanel from "./ControlPanel"; // Ensure ControlPanel is used if needed
import { loadPinsDataset, getCategories } from "./pins";
import ClusteredPinMarkers from "./ClusteredPinMarkers";

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
    <div style={{ width: "100%", height: "100vh" }}>
      <select onChange={handleCategoryChange}>
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.key} value={category.key}>
            {category.label} ({category.count})
          </option>
        ))}
      </select>
      <APIProvider apiKey={apiKey}>
        <Map
          mapId={"2b7e317fcb176699"}
          style={{ width: "100%", height: "100%" }}
          defaultCenter={{ lat, lng }}
          defaultZoom={14}
          gestureHandling={"greedy"}
          disableDefaultUI
        >
          {/* Pass the filtered pins to ClusteredPinMarkers to display them */}
          <ClusteredPinMarkers pins={filteredPins} />
        </Map>
      </APIProvider>

      <ControlPanel
        categories={categories}
        onCategoryChange={handleCategoryChange} // Ensure this function is used correctly
      />
    </div>
  );
};

export default MapComponent;
