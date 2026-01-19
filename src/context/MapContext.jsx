import { createContext, useContext, useState } from "react";

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [selectedStation, setSelectedStation] = useState(null);

  return (
    <MapContext.Provider value={{ selectedStation, setSelectedStation }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => useContext(MapContext);
