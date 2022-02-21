import React, { useState } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Scene3d from "./features/Components/Scene";
import Finger from "./features/Components/Finger";
import Panel from "./features/Components/Panel";
import * as ReactBootstrap from "react-bootstrap";
function App() {
  const [FingerDisp, setFingerDisp] = useState("");
  const [SceneDIsp, setSceneDIsp] = useState(false);
  const [canvdisp, setcanvdisp] = useState("none");

  setTimeout(() => {
    setcanvdisp("block");
  }, 1000);

  const handleClick = () => {
    setFingerDisp("none");
  };

  const handleClickScene = () => {
    setSceneDIsp(true);
  };

  const getColorPressed = (value, index) => {
    SelectedMeshColor(value, index);
  };

  const SelectedMeshColor = (color, mesh) => {
    console.log(color, mesh);
    let event = new CustomEvent("selectedMesh-color", {
      detail: {
        color,
        mesh,
      },
    });
    window.dispatchEvent(event);
  };

  if (SceneDIsp) {
    return (
      <div className="App unselectable">
        <div style={{ display: canvdisp, height: "100%", width: "100%" }}>
          <Finger display={FingerDisp} style={{ display: FingerDisp }} />
          <Scene3d handleClick={handleClick} />
          <Panel getColorPressed={getColorPressed} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="App unselectable">
        <button className="but" onClick={() => setSceneDIsp(true)}>
          <img className="butimg" src="play-button.svg"></img>
        </button>
      </div>
    );
  }
}

export default App;
