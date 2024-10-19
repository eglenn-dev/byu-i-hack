import React, { useCallback } from "react";

const ControlPanel = ({ categories, onCategoryChange }) => {
  const handleCategoryChange = useCallback(
    (e) => {
      onCategoryChange(e.target.value || null);
    },
    [onCategoryChange]
  );

  return <div className="control-panel marker-clustering-control-panel"></div>;
};

export default ControlPanel;
