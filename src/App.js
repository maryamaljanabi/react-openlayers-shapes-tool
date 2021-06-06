import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MapShapeToWkt from "./pages/MapShapeToWkt/MapShapeToWkt";
import WktToMap from "./pages/WktToMap/WktToMap";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path={["/home", "/"]} component={Home} />
        <Route exact path="/wktToMap" component={WktToMap} />
        <Route exact path="/MapShapeToWkt" component={MapShapeToWkt} />
      </Switch>
    </Layout>
  );
}

export default App;
