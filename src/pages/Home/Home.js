import React, { useState } from "react";
import Map from "../../components/Map/Map";
import "./Home.scss";
import TabsContainer from "./TabsContainer";

export default function Home() {
  const [map, setMap] = useState(null);
  return (
    <div>
      <Map returnRef={setMap} />
      <TabsContainer map={map} />
      <div className="footer">© 2021 Maryam Aljanabi</div>
    </div>
  );
}
