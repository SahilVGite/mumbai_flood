import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, useRef, useEffect } from "react";
import SideBar from "./components/Sidebar";
// import { Map, MapControls } from "./components/ui/map";
// import { Source, Layer } from "react-map-gl";
import { Card } from "./components/ui/card";
import SponserIcons from "./components/SponserIcons";
import UserInteractions from "./components/UserInteractions";

import { Map, Source, Layer } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

function App() {
  const mapRef = useRef(null);
  // console.log("MapControls:", MapControls);

  const mumbaiCoastalBounds = [
    [71.8, 18.4], // ⬅ More into Arabian Sea
    [73.4, 19.8], // Right side stays same (till Matheran)
  ];

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
    ],
  };

  const squareIcon = {
    width: 8,
    height: 8,
    data: new Uint8Array(8 * 8 * 4).fill(255),
  };

  return (
    <>
      <Router>
        <Suspense
          fallback={
            <div className="p-8 text-center text-gray-600">Loading...</div>
          }
        >
          <UserInteractions />
          <Routes>
            <Route path="/" element={<div></div>} />
          </Routes>
          <div className="mapContent">
            <Card className="w-full h-screen p-0 overflow-hidden">
              <Map
                initialViewState={{
                  longitude: 72.6,
                  latitude: 19.05,
                  zoom: 10.5,
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
                    const data = new Uint8Array(size * size * 4);

                    for (let i = 0; i < data.length; i += 4) {
                      data[i] = 255; // R
                      data[i + 1] = 255; // G
                      data[i + 2] = 255; // B
                      data[i + 3] = 255; // A
                    }

                    map.addImage(
                      "square",
                      {
                        width: size,
                        height: size,
                        data: data,
                      },
                      {
                        sdf: true, // 🔥 THIS IS THE KEY
                      }
                    );
                  }
                }}
              >
                <Source id="flood" type="geojson" data={floodPoints}>
                  <Layer
                    id="flood-grid"
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
                </Source>
              </Map>
            </Card>
          </div>
          <SponserIcons />
        </Suspense>
      </Router>
    </>
  );
}

export default App;
