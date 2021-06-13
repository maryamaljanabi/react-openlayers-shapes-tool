import React, { useState } from "react";
import { Tabs } from "antd";
import MapShapeToWkt from "../MapShapeToWkt/MapShapeToWkt";
import WktToMap from "../WktToMap/WktToMap";
const { TabPane } = Tabs;

export default function TabsContainer({ map }) {
  return (
    <div className="tabs-container">
      <Tabs defaultActiveKey="1" type="card" size="large">
        <TabPane tab="wktToMap" key="1">
          <WktToMap map={map} />
        </TabPane>
        <TabPane tab="mapToWkt" key="2">
          <MapShapeToWkt map={map} />
        </TabPane>
      </Tabs>
    </div>
  );
}
