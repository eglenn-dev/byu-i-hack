import React, { useCallback } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

const PinMarker = ({ pin, onClick, setMarkerRef }) => {
  const handleClick = useCallback(() => onClick(pin), [onClick, pin]);

  const ref = useCallback(
    (marker) => setMarkerRef(marker, pin.key),
    [setMarkerRef, pin.key]
  );

  return (
    <AdvancedMarker
      position={pin.position} // Ensure pin.position is valid
      ref={ref}
      onClick={handleClick}
    >
      {pin.category === "neighborhood" ? (
        <span className="marker-clustering-tree">🚨</span>
      ) : (
        <span className="marker-clustering-tree">🚗</span>
      )}
    </AdvancedMarker>
  );
};

export default PinMarker;

// import React, { useCallback } from "react";
// import { AdvancedMarker } from "@vis.gl/react-google-maps";

// const PinMarker = ({ pin, onClick, setMarkerRef }) => {
//   const handleClick = useCallback(() => onClick(pin), [onClick, pin]);

//   const ref = useCallback(
//     (marker) => setMarkerRef(marker, pin.key),
//     [setMarkerRef, pin.key]
//   );

//   return (
//     <AdvancedMarker position={pin.position} ref={ref} onClick={handleClick}>
//       <span className="marker-clustering-tree">🌳</span>
//     </AdvancedMarker>
//   );
// };

// export default PinMarker;
