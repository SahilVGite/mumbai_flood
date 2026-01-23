import { Source, Layer } from "react-map-gl/maplibre";

export default function ReportedFloodLayers({ reportedFloodPoints, tweetPoints }) {
  return (
    <>
      <Source id="reported-floods" type="geojson" data={reportedFloodPoints}>
        <Layer
          id="reported-floods-bg"
          type="circle"
          paint={{
            "circle-radius": 14,
            "circle-color": "#ff5f8dcc",
          }}
        />
        <Layer
          id="reported-floods-layer"
          type="symbol"
          layout={{
            "text-field": "🗎",
            "text-size": 16,
            "text-allow-overlap": true,
          }}
          paint={{ "text-color": "#fff" }}
        />
      </Source>

      <Source id="tweets" type="geojson" data={tweetPoints}>
        <Layer
          id="tweets-bg"
          type="circle"
          paint={{
            "circle-radius": 14,
            "circle-color": "#326afdcc",
          }}
        />
        <Layer
          id="tweets-layer"
          type="symbol"
          layout={{
            "text-field": "𝕏",
            "text-size": 16,
            "text-allow-overlap": true,
          }}
          paint={{ "text-color": "#fff" }}
        />
      </Source>
    </>
  );
}
