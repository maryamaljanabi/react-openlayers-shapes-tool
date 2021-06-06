import React, { useState } from "react";
import Map from "../../components/Map/Map";
import "./Home.scss";

export default function Home() {
  const [map, setMap] = useState(null);
  return (
    <div>
      <Map returnRef={setMap} />
    </div>
  );
}
