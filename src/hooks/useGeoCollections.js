import { useMemo } from "react";
import { reportedFloodData, twittedData } from "../data/reportedFloodData";

export const useGeoCollections = () => {
  const reportedFloodPoints = useMemo(() => ({
    type: "FeatureCollection",
    features: reportedFloodData.map((r) => ({
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
  }), []);

  const tweetPoints = useMemo(() => ({
    type: "FeatureCollection",
    features: twittedData.map((t) => ({
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
  }), []);

  return { reportedFloodPoints, tweetPoints };
};
