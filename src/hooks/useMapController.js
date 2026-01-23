import { useCallback } from "react";

export const useMapController = (mapRef) => {
  const getResponsiveCenter = () =>
    window.innerWidth <= 1100 ? [72.91, 19.13] : [72.6, 19.05];

  const flyTo = useCallback((coords, zoom) => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    map.flyTo({
      center: coords,
      zoom,
      speed: 0.9,
      curve: 1.2,
      essential: true,
    });
  }, []);

  const easeToCenter = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    map.easeTo({ center: getResponsiveCenter(), duration: 500 });
  }, []);

  return { flyTo, getResponsiveCenter, easeToCenter };
};
