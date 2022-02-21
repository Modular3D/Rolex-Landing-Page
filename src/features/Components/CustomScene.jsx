import { Engine, Scene, DefaultLoadingScreen } from "@babylonjs/core";
import React, { useEffect, useRef } from "react";

export default (props) => {
  const reactCanvas = useRef(null);
  const {
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    ...rest
  } = props;

  useEffect(() => {
    if (reactCanvas.current) {
      const engine = new Engine(
        reactCanvas.current,
        antialias,
        engineOptions,
        adaptToDeviceRatio
      );
      const scene = new Scene(engine, sceneOptions);
      if (scene.isReady()) {
        DefaultLoadingScreen.prototype.displayLoadingUI = function () {
          if (this._loadingDiv) {
            // Do not add a loading screen if there is already one
            return;
          }
          this._loadingDivBlock = document.createElement("div");
          this._loadingDivBlock.id = "babylonjsLoadingDivBlock";
          this._loadingDivBlock.style.opacity = "1";
          this._loadingDivBlock.style.transition = "opacity 1s ease";
          this._loadingDivBlock.style.pointerEvents = "none";
          this._loadingDivBlock.style.backgroundColor = "transparent";
          this._loadingDivBlock.style.position = "absolute";
          this._loadingDivBlock.style.width = "100%";
          this._loadingDivBlock.style.height = "100vh";
          this._loadingDivBlock.style.top = "0vh";
          this._loadingDivBlock.style.left = "0%";
          this._loadingDiv = document.createElement("div");
          this._loadingDiv.id = "babylonjsLoadingDiv";
          this._loadingDiv.style.opacity = "1";
          this._loadingDiv.style.transition = "opacity 1s ease";
          this._loadingDiv.style.pointerEvents = "none";
          this._loadingDiv.style.backgroundColor = "transparent";
          this._loadingDiv.style.border = "0.5vh solid #f3f3f3";
          this._loadingDiv.style.borderTop = "0.5vh solid #3E67EC";
          this._loadingDiv.style.borderRadius = "50%";
          this._loadingDiv.style.position = "relative";
          this._loadingDiv.style.margin = "auto";
          this._loadingDiv.style.top = "47vh";
          this._loadingDiv.style.width = "6vh";
          this._loadingDiv.style.height = "6vh";
          this._loadingDiv.style.animation = "spin 1s linear infinite";
          // Generating keyframes
          var style = document.createElement("style");
          style.type = "text/css";
          var keyFrames =
            "@-webkit-keyframes spin { 0% { -webkit-transform: rotate(0deg); }\n 100% { -webkit-transform: rotate(360deg); }\n }";
          style.innerHTML = keyFrames;
          document.getElementsByTagName("head")[0].appendChild(style);
          // this._resizeLoadingUI();
          // window.addEventListener("resize", this._resizeLoadingUI);
          this._loadingDiv.style.backgroundColor = this._loadingDivBackgroundColor;
          document.body.appendChild(this._loadingDivBlock);
          this._loadingDivBlock.appendChild(this._loadingDiv);
          this._loadingDivBlock.style.opacity = "1";
          this._loadingDivBlock.style.transition = "opacity 1s ease";
          this._loadingDivBlock.style.pointerEvents = "none";
          this._loadingDivBlock.style.backgroundColor = "transparent";
          this._loadingDivBlock.style.position = "absolute";
          this._loadingDivBlock.style.width = "100%";
          this._loadingDivBlock.style.height = "100vh";
          this._loadingDivBlock.style.top = "0vh";
          this._loadingDivBlock.style.left = "0%";
          this._loadingDiv.style.opacity = "1";
          this._loadingDiv.style.transition = "opacity 1s ease";
          this._loadingDiv.style.pointerEvents = "none";
          this._loadingDiv.style.backgroundColor = "transparent";
          this._loadingDiv.style.border = "0.5vh solid #f3f3f3";
          this._loadingDiv.style.borderTop = "0.5vh solid #3E67EC";
          this._loadingDiv.style.borderRadius = "50%";
          this._loadingDiv.style.position = "relative";
          this._loadingDiv.style.margin = "auto";
          this._loadingDiv.style.top = "47vh";
          this._loadingDiv.style.width = "6vh";
          this._loadingDiv.style.height = "6vh";
          this._loadingDiv.style.animation = "spin 1s linear infinite";
        };

        props.onSceneReady(scene);
      } else {
        scene.onReadyObservable.addOnce((scene) => props.onSceneReady(scene));
      }

      engine.runRenderLoop(() => {
        if (typeof onRender === "function") {
          onRender(scene);
        }
        scene.render();
      });

      const resize = () => {
        scene.getEngine().resize();
      };

      if (window) {
        window.addEventListener("resize", resize);
      }

      return () => {
        scene.getEngine().dispose();

        if (window) {
          window.removeEventListener("resize", resize);
        }
      };
    }
  }, [reactCanvas]);

  return <canvas ref={reactCanvas} {...rest} />;
};
