import { useState } from "react";
import AR from "./app/AR";
import Map from "./app/map";

const App = () => {
  const [showMap, setShowMap] = useState(0);
  if (showMap === 1) {
    return <AR />;
  }
  if (showMap === 0) {
    return <Map />;
  }
};

export default App;
