import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import MapShapeToWkt from "../MapShapeToWkt/MapShapeToWkt";
import WktToMap from "../WktToMap/WktToMap";

export default function TabsContainer({ map }) {
  const [key, setKey] = useState("wktToMap");
  return (
    <div className="tabs-container">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="wktToMap" title="WKT To Map">
          <WktToMap map={map} />
        </Tab>
        <Tab eventKey="mapToWkt" title="WKT From Map Shape">
          <MapShapeToWkt map={map} />
        </Tab>
      </Tabs>
    </div>
  );
}
