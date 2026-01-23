import { Source, Layer } from "react-map-gl/maplibre";
import { RAIL_COLORS } from "../../data/railwayData";

export default function DynamicLayers({
  activeData,
  currentMode,
  setSelectedPoint,
  setSelectedStation,
  selectedPoint,
}) {
  if (!activeData) return null;

  return (
    <Source id="dynamic" type="geojson" data={activeData}>
      {/* FLOOD */}
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
          filter={["!=", ["get", "id"], selectedPoint?.properties?.id || ""]}
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
  );
}
