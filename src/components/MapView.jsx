import { useLocation } from "react-router-dom";
import { useRef, useState, useMemo, useEffect } from "react";
import { Map, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import { MAP_MODES } from "../lib/mapConfig";
import { useMapContext } from "../context/MapContext";
import { mumbaiCoastalBounds } from "../data/mumbaiCoastalCordinates";

import { useGeoCollections } from "../hooks/useGeoCollections";
import { useMapController } from "../hooks/useMapController";

import TransportLayers from "../components/map/TransportLayers";
import ReportedFloodLayers from "../components/map/ReportedFloodLayers";
import DynamicLayers from "../components/map/DynamicLayers";

import { floodPoints } from "../data/floodPointsData";
import { waterPoints } from "../data/waterPointsData";
import { rainfallPoints } from "../data/rainfallPointsData";
import { railwayStations } from "../data/railwayData";

const mapDatasets = {
  floodPoints,
  rainfallPoints,
  waterPoints,
  transportPoints: railwayStations,
  reportedFloods: null,
};

export default function MapView() {
  const mapRef = useRef(null);
  const location = useLocation();
  const { selectedStation, setSelectedStation } = useMapContext();

  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const fullName = selectedPoint?.properties?.name || "";
  const [mainName, subName] = fullName.split(" – ").map((s) => s?.trim());

  const { reportedFloodPoints, tweetPoints } = useGeoCollections();
  const { flyTo, getResponsiveCenter } = useMapController(mapRef);

  const currentMode = useMemo(
    () => MAP_MODES[location.pathname] || MAP_MODES["/"],
    [location.pathname],
  );

  const activeData = mapDatasets[currentMode.dataKey];

  /* Reset on route change */
  useEffect(() => {
    setSelectedPoint(null);
    setSelectedStation(null);
    flyTo(getResponsiveCenter(), 9);
  }, [location.pathname]);

  /* Fly to dropdown selected station */
  useEffect(() => {
    if (!selectedStation || !isMapLoaded || !mapRef.current) return;

    const dataset =
      currentMode.dataKey === "waterPoints"
        ? waterPoints
        : currentMode.dataKey === "rainfallPoints"
          ? rainfallPoints
          : currentMode.dataKey === "transportPoints"
            ? railwayStations
            : null;

    if (!dataset) return;

    const feature = dataset.features.find(
      (f) => f.properties.id === selectedStation,
    );
    if (!feature) return;

    setSelectedPoint(feature);

    const map = mapRef.current.getMap();
    const isSmallScreen = window.innerWidth <= 1100;
    const offsetX = isSmallScreen ? -20 : -120;

    const point = map.project(feature.geometry.coordinates);
    const shifted = map.unproject({ x: point.x + offsetX, y: point.y });

    map.flyTo({
      center: shifted,
      zoom: isSmallScreen ? 12 : 13,
      speed: 0.9,
      curve: 1.2,
      essential: true,
    });
  }, [selectedStation, isMapLoaded, currentMode.dataKey]);

  useEffect(() => {
    // Clear any selection when route changes
    setSelectedPoint(null);
    setSelectedStation(null);

    // Reset map to default center + zoom
    const map = mapRef.current?.getMap();
    if (!map) return;

    map.flyTo({
      center: getResponsiveCenter(),
      zoom: 9,
      speed: 0.8,
      curve: 1.2,
      essential: true,
    });
  }, [location.pathname]);

  return (
    <Map
      ref={mapRef}
      interactiveLayerIds={[
        "water-normal",
        "rainfall-normal",
        "railway-stations",
      ]}
      initialViewState={{
        longitude: getResponsiveCenter()[0],
        latitude: getResponsiveCenter()[1],
        zoom: 9,
      }}
      mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
      style={{ width: "100%", height: "100vh" }}
      maxBounds={mumbaiCoastalBounds}
      onLoad={(e) => {
        setIsMapLoaded(true);
        const map = e.target;

        if (!map.hasImage("square")) {
          const size = 20;
          const data = new Uint8Array(size * size * 4).fill(255);
          map.addImage(
            "square",
            { width: size, height: size, data },
            { sdf: true },
          );
        }
      }}
    >
      {currentMode.dataKey === "transportPoints" && (
        <TransportLayers selectedPoint={selectedPoint} />
      )}

      {currentMode.dataKey === "reportedFloods" && (
        <ReportedFloodLayers
          reportedFloodPoints={reportedFloodPoints}
          tweetPoints={tweetPoints}
        />
      )}

      {currentMode.dataKey !== "reportedFloods" && (
        <DynamicLayers
          activeData={activeData}
          currentMode={currentMode}
          setSelectedPoint={setSelectedPoint}
          setSelectedStation={setSelectedStation}
          selectedPoint={selectedPoint}
        />
      )}

      {selectedPoint && (
        <Popup
          longitude={selectedPoint.geometry.coordinates[0]}
          latitude={selectedPoint.geometry.coordinates[1]}
          closeButton={false}
          anchor="bottom"
          offset={[0, -22]}
        >
          <div className="bg-[#4F7DFF] text-white rounded-2xl opacity-80 px-4 py-2 shadow-xl text-center">
            {/* TOP TITLE */}
            <div className="text-lg font-semibold">{mainName}</div>

            {/* BOTTOM SUBTITLE */}
            {currentMode.dataKey !== "transportPoints" && subName && (
              <div className="text-xs opacity-90">{subName}</div>
            )}
          </div>
        </Popup>
      )}
    </Map>
  );
}
