import OlFeature from "ol/Feature";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import WKT from "ol/format/WKT";
import { Style, Fill, Stroke, Circle } from "ol/style";

import "ol/ol.css";
import "ol-layerswitcher/src/ol-layerswitcher.css";

export const drawWktFeature = (map, wktFeature) => {
  removeLayer(map, "wktLayer");
  const wktFormat = new WKT();
  const geometry = wktFormat.readGeometry(wktFeature, {
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857",
  });

  if (map) {
    const poly = new OlFeature({
      geometry: geometry,
    });

    const vectorLayer = new VectorLayer({
      title: "WKT Layer",
      source: new VectorSource({
        features: [poly],
      }),
      style: poly.getGeometry().getType().includes("Point")
        ? new Style({
            image: new Circle({
              radius: 7,
              fill: new Fill({ color: "rgba(0, 98, 255, 0.4)" }),
              stroke: new Stroke({
                color: "#0000ff",
                width: 2,
              }),
            }),
          })
        : new Style({
            fill: new Fill({
              color: "rgba(0, 98, 255, 0.4)",
            }),
            stroke: new Stroke({
              color: "#0000ff",
              width: 2,
            }),
          }),
    });

    vectorLayer.set("name", "wktLayer");

    map.addLayer(vectorLayer);
    const polygonExtent = vectorLayer.getSource().getFeatures()[0].getGeometry().getExtent();
    map.getView().fit(polygonExtent, map.getSize());
  }
};

export const validateGeometry = (geometry) => {
  const wktFormat = new WKT();
  try {
    const geom = wktFormat.readGeometry(geometry, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857",
    });
    const poly = new OlFeature({
      geometry: geom,
    });

    return poly.getGeometry().getType();
  } catch (error) {
    return null;
  }
};

//remove layer from map by name
export const removeLayer = (map, layerName) => {
  map.getLayers().forEach((layer) => {
    if (layer && layer.get("name") === layerName) {
      map.removeLayer(layer);
    }
  });
};
