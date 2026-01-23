import { Source, Layer } from "react-map-gl/maplibre";
import { railwayRoutes, RAIL_COLORS } from "../../data/railwayData";

export default function TransportLayers({ selectedPoint }) {
  const routeData = selectedPoint
    ? {
        type: "FeatureCollection",
        features: railwayRoutes.features.filter(
          (r) => r.properties.id === selectedPoint.properties.line
        ),
      }
    : railwayRoutes;

  const opacity = selectedPoint ? 0.55 : 0.35;

  return (
    <Source id="rail-routes" type="geojson" data={routeData}>
      <Layer
        id="railway-routes-layer"
        type="line"
        paint={{
          "line-width": 6,
          "line-opacity": opacity,
          "line-color": [
            "match",
            ["get", "id"],
            "western", RAIL_COLORS.western,
            "central", RAIL_COLORS.central,
            "#fff",
          ],
        }}
      />
    </Source>
  );
}
