import { useLocation } from "react-router-dom";

export const LocationDisplay = () => {
  const location = useLocation();
  return (
    <div style={{ display: "none" }} data-testid="location-display">
      {location.search}
    </div>
  );
};
