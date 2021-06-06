import OlFeature from "ol/Feature";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import WKT from "ol/format/WKT";
import { Style, Fill, Stroke } from "ol/style";

import "ol/ol.css";
import "ol-layerswitcher/src/ol-layerswitcher.css";

export const drawWktFeature = (map, wktFeature) => {
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
      style: new Style({
        fill: new Fill({
          color: "rgba(78, 136, 230, 0.4)",
        }),
        stroke: new Stroke({
          color: "#319FD3",
          width: 1,
        }),
      }),
    });

    vectorLayer.set("name", "wktLayer");

    map.addLayer(vectorLayer);
    const polygonExtent = vectorLayer
      .getSource()
      .getFeatures()[0]
      .getGeometry()
      .getExtent();
    map.getView().fit(polygonExtent, map.getSize());
  }
};
