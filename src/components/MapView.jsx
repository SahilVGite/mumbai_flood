import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Map, Source, Layer, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { MAP_MODES } from "../lib/mapConfig";
import { useMapContext } from "../context/MapContext";
import {
  railwayStations,
  railwayRoutes,
  RAIL_COLORS,
} from "../data/railwayData";
import { floodPoints } from "../data/floodPointsData";
import { waterPoints } from "../data/waterPointsData";
import { rainfallPoints } from "../data/rainfallPointsData";
import { mumbaiCoastalBounds } from "../data/mumbaiCoastalCordinates";
import { reportedFloodData, twittedData } from "../data/reportedFloodData";

export default function MapView() {
  const mapRef = useRef(null);
  const location = useLocation();
  const { selectedStation, setSelectedStation } = useMapContext();
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const selectedRouteId = selectedPoint?.properties?.route;
  const [iconsLoaded, setIconsLoaded] = useState(false);

  const mapDatasets = {
    floodPoints,
    rainfallPoints,
    waterPoints,
    transportPoints: railwayStations,
    reportedFloods: null,
  };

  const currentMode = MAP_MODES[location.pathname] || MAP_MODES["/"];
  const activeData = mapDatasets[currentMode.dataKey];

  // Fly to selected dropdown station
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
    const screenOffsetX = isSmallScreen ? -20 : -120;

    const point = map.project(feature.geometry.coordinates);
    const shiftedLngLat = map.unproject({
      x: point.x + screenOffsetX,
      y: point.y,
    });

    map.flyTo({
      center: shiftedLngLat,
      zoom: isSmallScreen ? 12 : 13,
      speed: 0.9,
      curve: 1.2,
      essential: true,
    });
  }, [selectedStation, isMapLoaded, currentMode.dataKey]);

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
    // On every route change:
    setSelectedPoint(null); // close popup
    setSelectedStation(null); // deselect dropdown value

    // Reset map only if no station is selected
    if (!mapRef.current) return;

    const map = mapRef.current.getMap();

    map.flyTo({
      center: getResponsiveCenter(),
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

  const reportedFloodPoints = {
    type: "FeatureCollection",
    features: reportedFloodData.map((r, i) => ({
      type: "Feature",
      properties: {
        type: "report",
        title: r.location.area,
        message: r.message,
      },
      geometry: {
        type: "Point",
        coordinates: r.location.coordinates,
      },
    })),
  };

  const tweetPoints = {
    type: "FeatureCollection",
    features: twittedData.map((t, i) => ({
      type: "Feature",
      properties: {
        type: "tweet",
        title: t.twitter,
        message: t.message,
      },
      geometry: {
        type: "Point",
        coordinates: t.coordinates,
      },
    })),
  };

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
        setIsMapLoaded(true);
        const map = e.target;

        // keep square
        if (!map.hasImage("square")) {
          const size = 20;
          const data = new Uint8Array(size * size * 4).fill(255);
          map.addImage(
            "square",
            { width: size, height: size, data },
            { sdf: true },
          );
        }

        const ICONS = {
          "reported-icon": "/icons/reported.png",
          "twitter-icon": "/icons/twitter.png",
        };

        map.on("styledata", () => {
          Object.entries(ICONS).forEach(([id, url]) => {
            if (!map.hasImage(id)) {
              map.loadImage(url, (err, img) => {
                if (!err && img && !map.hasImage(id)) {
                  map.addImage(id, img);
                }
              });
            }
          });

          setIconsLoaded(true);
        });
      }}
    >
      {currentMode.dataKey === "transportPoints" && !selectedPoint && (
        <Source id="rail-routes-all" type="geojson" data={railwayRoutes}>
          <Layer
            id="railway-routes-all"
            type="line"
            paint={{
              "line-width": 6,
              "line-color": [
                "match",
                ["get", "id"],
                "western",
                RAIL_COLORS.western,
                "central",
                RAIL_COLORS.central,
                "#ffffff",
              ],
              "line-opacity": 0.35,
            }}
          />
        </Source>
      )}

      {currentMode.dataKey === "transportPoints" && selectedPoint && (
        <Source
          id="rail-route-single"
          type="geojson"
          data={{
            type: "FeatureCollection",
            features: railwayRoutes.features.filter(
              (r) => r.properties.id === selectedPoint.properties.line,
            ),
          }}
        >
          <Layer
            id="railway-route-single"
            type="line"
            paint={{
              "line-width": 6,
              "line-color": [
                "match",
                ["get", "id"],
                "western",
                RAIL_COLORS.western,
                "central",
                RAIL_COLORS.central,
                "#ffffff",
              ],
              "line-opacity": 0.5,
            }}
          />
        </Source>
      )}

      {activeData && (
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
              filter={[
                "!=",
                ["get", "id"],
                selectedPoint?.properties?.id || "",
              ]}
              paint={{
                "circle-radius": 6,
                "circle-color": "#326AFD",
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
                "circle-color": "#326AFD",
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
                "circle-color": "#326AFD",
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

          {/* NORMAL RAINFALL MARKERS */}
          {currentMode.dataKey === "rainfallPoints" && (
            <Layer
              id="rainfall-normal"
              source="dynamic"
              type="circle"
              filter={[
                "!=",
                ["get", "id"],
                selectedPoint?.properties?.id || "",
              ]}
              paint={{
                "circle-radius": 6,
                "circle-color": "#326AFD",
              }}
              onClick={(e) => {
                const feature = e.features[0];
                setSelectedPoint(feature);
              }}
            />
          )}

          {/* SELECTED RAINFALL GLOW */}
          {currentMode.dataKey === "rainfallPoints" && selectedPoint && (
            <Layer
              id="rainfall-glow"
              source="dynamic"
              type="circle"
              filter={["==", ["get", "id"], selectedPoint.properties.id]}
              paint={{
                "circle-radius": 10,
                "circle-color": "#326AFD",
                "circle-opacity": 1,
              }}
            />
          )}

          {/* SELECTED RAINFALL BORDER */}
          {currentMode.dataKey === "rainfallPoints" && selectedPoint && (
            <Layer
              id="rainfall-border"
              source="dynamic"
              type="circle"
              filter={["==", ["get", "id"], selectedPoint.properties.id]}
              paint={{
                "circle-radius": 8,
                "circle-color": "#326AFD",
              }}
            />
          )}

          {/* SELECTED RAINFALL CENTER */}
          {currentMode.dataKey === "rainfallPoints" && selectedPoint && (
            <Layer
              id="rainfall-center"
              source="dynamic"
              type="circle"
              filter={["==", ["get", "id"], selectedPoint.properties.id]}
              paint={{
                "circle-radius": 4,
                "circle-color": "#ffffff",
              }}
            />
          )}

          {/* Railway Layer */}
          {currentMode.dataKey === "transportPoints" && (
            <Layer
              id="railway-stations"
              type="circle"
              source="dynamic"
              paint={{
                "circle-radius": 6,
                "circle-color": [
                  "match",
                  ["get", "line"],
                  "western",
                  RAIL_COLORS.western,
                  "central",
                  RAIL_COLORS.central,
                  "#ffffff",
                ],
              }}
              onClick={(e) => {
                const f = e.features[0];
                setSelectedStation(f.properties.id);
              }}
            />
          )}

          {/* SELECTED STATION OUTER RING */}
          {selectedPoint && currentMode.dataKey === "transportPoints" && (
            <Layer
              id="railway-selected-ring"
              type="circle"
              source="dynamic"
              filter={["==", ["get", "id"], selectedPoint.properties.id]}
              paint={{
                "circle-radius": 12,
                "circle-color": [
                  "match",
                  ["get", "line"],
                  "western",
                  RAIL_COLORS.western,
                  "central",
                  RAIL_COLORS.central,
                  "#ffffff",
                ],
                "circle-opacity": 0.9,
              }}
            />
          )}

          {/* SELECTED STATION WHITE CENTER */}
          {selectedPoint && currentMode.dataKey === "transportPoints" && (
            <Layer
              id="railway-selected-center"
              type="circle"
              source="dynamic"
              filter={["==", ["get", "id"], selectedPoint.properties.id]}
              paint={{
                "circle-radius": 5,
                "circle-color": "#ffffff",
              }}
            />
          )}
        </Source>
      )}

      {currentMode.dataKey === "reportedFloods" && (
        <>
          {/* REPORT BACKGROUND CIRCLE */}
          <Source
            id="reported-floods"
            type="geojson"
            data={reportedFloodPoints}
          >
            <Layer
              id="reported-floods-bg"
              type="circle"
              paint={{
                "circle-radius": 14,
                "circle-color": "#ff5f8dcc",
                "circle-opacity": 0.9,
              }}
            />

            {/* REPORT TEXT ICON */}
            <Layer
              id="reported-floods-layer"
              type="symbol"
              layout={{
                "text-field": "🗎",
                "text-size": 16,
                "text-allow-overlap": true,
                "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
              }}
              paint={{
                "text-color": "#ffffff",
              }}
            />
          </Source>

          {/* TWEETS */}
          <Source id="tweets" type="geojson" data={tweetPoints}>
            {/* TWEET BACKGROUND CIRCLE */}
            <Layer
              id="tweets-bg"
              type="circle"
              paint={{
                "circle-radius": 14,
                "circle-color": "#326afdcc",
                "circle-opacity": 0.9,
              }}
            />

            {/* TWEET TEXT ICON */}
            <Layer
              id="tweets-layer"
              type="symbol"
              layout={{
                "text-field": "𝕏",
                "text-size": 16,
                "text-allow-overlap": true,
                "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
              }}
              paint={{
                "text-color": "#ffffff",
              }}
            />
          </Source>
        </>
      )}

      {selectedPoint && (
        <Popup
          longitude={selectedPoint.geometry.coordinates[0]}
          latitude={selectedPoint.geometry.coordinates[1]}
          closeButton={false}
          anchor="bottom"
          offset={[0, -22]}
        >
          <div className="bg-[#4F7DFF] text-white rounded-2xl px-4 py-2 shadow-xl text-center">
            <div className="text-lg font-semibold">
              {selectedPoint.properties.name}
            </div>

            {currentMode.dataKey !== "transportPoints" ? (
              <div className="text-xs opacity-90">
                {selectedPoint.properties.name.split(" – ")[1]}
              </div>
            ) : null}
          </div>
        </Popup>
      )}
    </Map>
  );
}
