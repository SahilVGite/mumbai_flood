import { BrowserRouter as Router } from "react-router-dom";
import { Suspense } from "react";
import { Card } from "./components/ui/card";
import SponserIcons from "./components/SponserIcons";
import UserInteractions from "./components/UserInteractions";
import MapView from "./components/MapView";
import { MapProvider } from "./context/MapContext";
import { Routes, Route } from "react-router-dom";
import ReportFloodForm from "./components/ReportFloodForm";

function App() {
  return (
    <MapProvider>
      <Router>
        <Suspense
          fallback={
            <div className="p-8 text-center text-gray-600">Loading...</div>
          }
        >
          <UserInteractions />

          <div className="mapContent">
            <Card className="w-full h-screen p-0 overflow-hidden">
              <MapView />
            </Card>
          </div>
          <Routes>
            <Route path="/report-flood" element={<ReportFloodForm />} />
          </Routes>

          <SponserIcons />
        </Suspense>
      </Router>
    </MapProvider>
  );
}

export default App;
