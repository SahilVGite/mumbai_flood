import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Map, Source, Layer, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { MAP_MODES } from "../lib/mapConfig";
import { useMapContext } from "../context/MapContext";

const mumbaiCoastalBounds = [
  [71.8, 18.4],
  [73.4, 19.8],
];

// All datasets live here
const floodPoints = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { level: "high" },
      geometry: { type: "Point", coordinates: [72.85, 19.05] },
    },
    {
      type: "Feature",
      properties: { level: "moderate" },
      geometry: { type: "Point", coordinates: [72.86, 19.06] },
    },
    {
      type: "Feature",
      properties: { level: "low" },
      geometry: { type: "Point", coordinates: [72.87, 19.04] },
    },
    {
      type: "Feature",
      properties: { level: "low" },
      geometry: { type: "Point", coordinates: [72.823499, 19.050652] },
    },
    {
      type: "Feature",
      properties: { level: "moderate" },
      geometry: { type: "Point", coordinates: [72.821966, 19.049593] },
    },
    {
      type: "Feature",
      properties: { level: "high" },
      geometry: { type: "Point", coordinates: [72.831754, 19.050541] },
    },
    {
      type: "Feature",
      properties: { level: "moderate" },
      geometry: { type: "Point", coordinates: [72.811517, 19.140071] },
    },
    {
      type: "Feature",
      properties: { level: "moderate" },
      geometry: { type: "Point", coordinates: [72.828068, 19.151831] },
    },
    {
      type: "Feature",
      properties: { level: "low" },
      geometry: { type: "Point", coordinates: [72.824531, 19.121093] },
    },
    {
      type: "Feature",
      properties: { level: "high" },
      geometry: { type: "Point", coordinates: [72.86612, 19.100776] },
    },
    {
      type: "Feature",
      properties: { level: "moderate" },
      geometry: { type: "Point", coordinates: [72.824107, 19.111202] },
    },
    {
      type: "Feature",
      properties: { level: "moderate" },
      geometry: { type: "Point", coordinates: [72.840233, 19.122964] },
    },
    {
      type: "Feature",
      properties: { level: "low" },
      geometry: { type: "Point", coordinates: [72.866828, 19.097033] },
    },
    {
      type: "Feature",
      properties: { level: "high" },
      geometry: { type: "Point", coordinates: [72.82057, 19.045025] },
    },
    {
      type: "Feature",
      properties: { level: "low" },
      geometry: { type: "Point", coordinates: [72.824248, 19.062407] },
    },
    {
      type: "Feature",
      properties: { level: "high" },
      geometry: { type: "Point", coordinates: [72.847634, 19.047569] },
    },
    {
      type: "Feature",
      properties: { level: "moderate" },
      geometry: { type: "Point", coordinates: [72.876359, 19.126181] },
    },
    {
      type: "Feature",
      properties: { level: "moderate" },
      geometry: { type: "Point", coordinates: [72.86355, 19.114783] },
    },
    {
      type: "Feature",
      properties: { level: "high" },
      geometry: { type: "Point", coordinates: [72.873375, 19.106205] },
    },
    {
      type: "Feature",
      properties: { level: "moderate" },
      geometry: { type: "Point", coordinates: [72.87723, 19.138283] },
    },
    {
      type: "Feature",
      properties: { level: "moderate" },
      geometry: { type: "Point", coordinates: [72.870017, 19.146624] },
    },
    {
      type: "Feature",
      properties: { level: "high" },
      geometry: { type: "Point", coordinates: [72.839397, 19.135664] },
    },
    {
      type: "Feature",
      properties: { level: "high" },
      geometry: { type: "Point", coordinates: [72.794736, 19.15103] },
    },
    {
      type: "Feature",
      properties: { level: "low" },
      geometry: { type: "Point", coordinates: [72.831541, 19.157407] },
    },
    {
      type: "Feature",
      properties: { level: "low" },
      geometry: { type: "Point", coordinates: [72.841506, 19.152549] },
    },
    {
      type: "Feature",
      properties: { level: "high" },
      geometry: { type: "Point", coordinates: [72.7912, 19.132203] },
    },
    {
      type: "Feature",
      properties: { level: "high" },
      geometry: { type: "Point", coordinates: [72.788789, 19.143591] },
    },
    {
      type: "Feature",
      properties: { level: "high" },
      geometry: { type: "Point", coordinates: [72.802129, 19.145868] },
    },
    {
      type: "Feature",
      properties: { level: "moderate" },
      geometry: { type: "Point", coordinates: [72.794736, 19.150423] },
    },
    {
      type: "Feature",
      properties: { level: "high" },
      geometry: { type: "Point", coordinates: [72.784771, 19.165757] },
    },
    {
      type: "Feature",
      properties: { level: "high" },
      geometry: { type: "Point", coordinates: [72.832988, 19.160443] },
    },
  ],
};

export const waterPoints = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "andheri",
        name: "Andheri West – Canal Sensor",
      },
      geometry: { type: "Point", coordinates: [72.831541, 19.157407] },
    },
    {
      type: "Feature",
      properties: {
        id: "jogeshwari",
        name: "Jogeshwari East – Bridge Sensor",
      },
      geometry: { type: "Point", coordinates: [72.828876, 19.137796] },
    },
    {
      type: "Feature",
      properties: {
        id: "goregaon",
        name: "Goregaon West – Drain Sensor",
      },
      geometry: { type: "Point", coordinates: [72.824531, 19.121093] },
    },
  ],
};

// later you’ll add these
const rainfallPoints = { type: "FeatureCollection", features: [] };
// const waterPoints = { type: "FeatureCollection", features: [] };
const transportPoints = { type: "FeatureCollection", features: [] };

export default function MapView() {
  const mapRef = useRef(null);
  const location = useLocation();
  const { selectedStation } = useMapContext();
  const [selectedPoint, setSelectedPoint] = useState(null);

  const mapDatasets = {
    floodPoints,
    rainfallPoints,
    waterPoints,
    transportPoints,
  };

  const currentMode = MAP_MODES[location.pathname] || MAP_MODES["/"];
  const activeData = mapDatasets[currentMode.dataKey];

  // Fly to selected dropdown station
  useEffect(() => {
    if (!selectedStation) return;

    const feature = waterPoints.features.find(
      (f) => f.properties.id === selectedStation,
    );

    if (feature && mapRef.current) {
      setSelectedPoint(feature);

      const map = mapRef.current.getMap();

      // Responsive offset
      const isSmallScreen = window.innerWidth <= 1100;

      const screenOffsetX = isSmallScreen ? -20 : -120; // mobile: slight shift, desktop: strong shift
      const screenOffsetY = 0;

      const point = map.project(feature.geometry.coordinates);
      const shiftedPoint = {
        x: point.x + screenOffsetX,
        y: point.y + screenOffsetY,
      };

      const shiftedLngLat = map.unproject(shiftedPoint);

      map.flyTo({
        center: shiftedLngLat,
        zoom: isSmallScreen ? 12 : 13, // small screen → zoomed out, desktop → closer
        speed: 0.9,
        curve: 1.2,
        essential: true,
      });
    }
  }, [selectedStation]);

  useEffect(() => {
    // Whenever route changes away from Water Level, clear popup
    if (currentMode.dataKey !== "waterPoints") {
      setSelectedPoint(null);
    }
  }, [location.pathname, currentMode.dataKey]);

  const getResponsiveCenter = () => {
    // Mobile & tablet
    if (window.innerWidth <= 1100) {
      return [72.91, 19.13]; // slightly shifted center for small screens
    }

    // Desktop
    return [72.6, 19.05];
  };

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current.getMap();

    map.flyTo({
      center: getResponsiveCenter(), // your default Mumbai center
      zoom: 9,
      speed: 0.8,
      curve: 1.2,
      essential: true,
    });
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (!mapRef.current) return;

      const map = mapRef.current.getMap();
      const center = getResponsiveCenter();

      map.easeTo({
        center,
        duration: 500,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: getResponsiveCenter()[0],
        latitude: getResponsiveCenter()[1],
        zoom: 9,
      }}
      mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
      style={{ width: "100%", height: "100vh" }}
      maxBounds={mumbaiCoastalBounds}
      minZoom={9}
      maxZoom={15}
      onLoad={(e) => {
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
      <Source id="dynamic" type="geojson" data={activeData}>
        {currentMode.dataKey === "floodPoints" && (
          <Layer
            id="flood-layer"
            type="symbol"
            layout={{
              "icon-image": "square",
              "icon-size": [
                "interpolate",
                ["linear"],
                ["zoom"],
                9,
                0.4,
                12,
                0.7,
                15,
                1,
              ],
              "icon-allow-overlap": true,
            }}
            paint={{
              "icon-color": [
                "match",
                ["get", "level"],
                "high",
                "#105FCD",
                "moderate",
                "#029EFD",
                "low",
                "#54CEFF",
                "#54CEFF",
              ],
              "icon-opacity": 0.95,
            }}
          />
        )}

        {/* NORMAL MARKERS (all except selected) */}
        {currentMode.dataKey === "waterPoints" && (
          <Layer
            id="water-normal"
            source="dynamic"
            type="circle"
            filter={["!=", ["get", "id"], selectedPoint?.properties?.id || ""]}
            paint={{
              "circle-radius": 6,
              "circle-color": "#2563EB",
            }}
            onClick={(e) => {
              const feature = e.features[0];
              setSelectedPoint(feature);
            }}
          />
        )}

        {/* SELECTED MARKER GLOW */}
        {currentMode.dataKey === "waterPoints" && selectedPoint && (
          <Layer
            id="water-glow"
            source="dynamic"
            type="circle"
            filter={["==", ["get", "id"], selectedPoint.properties.id]}
            paint={{
              "circle-radius": 10,
              "circle-color": "#2563EB",
              "circle-opacity": 1,
            }}
          />
        )}

        {/* SELECTED MARKER BLUE BORDER */}
        {currentMode.dataKey === "waterPoints" && selectedPoint && (
          <Layer
            id="water-border"
            source="dynamic"
            type="circle"
            filter={["==", ["get", "id"], selectedPoint.properties.id]}
            paint={{
              "circle-radius": 10,
              "circle-color": "#2563EB",
            }}
          />
        )}

        {/* SELECTED MARKER WHITE CENTER */}
        {currentMode.dataKey === "waterPoints" && selectedPoint && (
          <Layer
            id="water-center"
            source="dynamic"
            type="circle"
            filter={["==", ["get", "id"], selectedPoint.properties.id]}
            paint={{
              "circle-radius": 5,
              "circle-color": "#ffffff",
            }}
          />
        )}
      </Source>

      {selectedPoint && (
        <Popup
          longitude={selectedPoint.geometry.coordinates[0]}
          latitude={selectedPoint.geometry.coordinates[1]}
          closeOnClick={false}
          closeButton={false}
          onClose={() => setSelectedPoint(null)}
          anchor="bottom"
          offset={[0, -22]} // pushes tooltip upward from marker center
        >
          <div className="bg-[#4F7DFF] text-white rounded-2xl px-4 py-2 shadow-xl text-center">
            <div className="text-lg font-semibold leading-tight">
              {selectedPoint.properties.name.split(" – ")[0]}
            </div>
            <div className="text-xs opacity-90">
              {selectedPoint.properties.name.split(" – ")[1]}
            </div>
          </div>
        </Popup>
      )}
    </Map>
  );
}
