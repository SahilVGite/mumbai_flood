import { BrowserRouter as Router } from "react-router-dom";
import { Suspense } from "react";
import { Card } from "./components/ui/card";
import SponserIcons from "./components/SponserIcons";
import UserInteractions from "./components/UserInteractions";
import MapView from "./components/MapView";
import { MapProvider } from "./context/MapContext";

function App() {
  return (
    <MapProvider>
      <Router>
        <Suspense
          fallback={<div className="p-8 text-center text-gray-600">Loading...</div>}
        >
          <UserInteractions />

          <div className="mapContent">
            <Card className="w-full h-screen p-0 overflow-hidden">
              <MapView />
            </Card>
          </div>

          <SponserIcons />
        </Suspense>
      </Router>
    </MapProvider>
  );
}

export default App;
