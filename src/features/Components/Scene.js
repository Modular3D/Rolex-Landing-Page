import React from "react";
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  SceneLoader,
  Color4,
  PointLight,
  Tools,
  DirectionalLight,
  ArcRotateCamera,
  CubeTexture,
  Scene,
  ShadowGenerator,
  Texture,
  SpotLight,
  Color3,
  MirrorTexture,
  Plane,
  StandardMaterial,
  DefaultLoadingScreen,
  PointerEventTypes,
  FxaaPostProcess,
} from "@babylonjs/core";
import SceneComponent from "./CustomScene"; // uses above component in same directory
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { TweenMax, Power2 } from "gsap";

var scene3;

const SpotLightofScene = (scene) => {
  return new SpotLight(
    "spotLight",
    new Vector3(0, 30, -10),
    new Vector3(0, -1, 0),
    Math.PI / 3,
    2,
    scene
  );
};

const PointLightofScene = (scene) => {
  return new PointLight("light", new Vector3(0, 1, 0), scene);
};

const HemisphericLighttofScene = (scene) => {
  return new HemisphericLight("light", new Vector3(0, 1, 0), scene);
};

async function onSceneReady(scene) {
  let divFps = document.getElementById("fps");
  // scene.debugLayer.show();
  scene.clearColor = new Color4.FromInts(244, 250, 255, 1);
  scene.imageProcessingConfiguration.contrast = 1.5;
  scene.environmentIntensity = 1.5;

  const canvas = scene.getEngine().getRenderingCanvas();

  var engine = scene.getEngine();
  // engine.setSize(window.innerWidth, window.innerHeight);

  if (window.devicePixelRatio < 2) {
    engine.setHardwareScalingLevel(1 / 2);
  } else {
    engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
  }

  var camera = new ArcRotateCamera(
    "Camera",
    1.57,
    1.157,
    0.184,
    new Vector3(0, 0.04, 0),
    scene
  );

  camera.target = new Vector3(0, 0.04, 0);
  camera.lowerRadiusLimit = 0.12;
  camera.upperRadiusLimit = 0.3;
  camera.minZ = 0.01;
  camera.wheelPrecision = 1500;
  camera.pinchPrecision = 80;
  camera.upperBetaLimit = 1.65;
  camera.panningSensibility = 0;
  camera.attachControl(canvas, true);
  camera.alpha = 1.57;
  camera.beta = 1.57;
  camera.radius = 0.184;

  let postProcess = new FxaaPostProcess("fxaa", 1.0, camera);
  postProcess.samples = 8;

  await SceneLoader.AppendAsync("", "Rolex_V8_draco.glb", scene);
  let HDR = new CubeTexture.CreateFromPrefilteredData(
    "Rolex_V4_HDR.env",
    scene
  );
  HDR.level = 2;
  let Root = scene.getMeshByName("__root__");

  for (var i = 0; i < scene.materials.length; i++) {
    scene.materials[i].reflectionTexture = HDR;
  }
  let Bezel = scene.getMaterialByName("Bezel");
  Bezel.metallic = 0.65;
  Bezel.roughness = 0;
  Bezel.enableSpecularAntiAliasing = true;

  let Bezel_Markers = scene.getMaterialByName("Bezel_Markers");
  Bezel_Markers.albedoColor = new Color3.FromInts(
    219,
    181,
    118
  ).toLinearSpace();
  Bezel_Markers.emissiveColor = new Color3.FromInts(
    219,
    181,
    118
  ).toLinearSpace();
  Bezel_Markers.roughness = 1;
  Bezel_Markers.enableSpecularAntiAliasing = true;

  let Calendar = scene.getMaterialByName("Calendar");
  Calendar.roughness = 0;
  Calendar.albedoTexture = new Texture(
    "Rolex_V2_Albedo_Black.jpg",
    this.scene,
    false,
    false
  );
  Calendar.emissiveTexture = new Texture(
    "Rolex_V2_Albedo_Black.jpg",
    this.scene,
    true,
    true
  );
  Calendar.emissiveColor = new Color3.FromInts(215, 215, 215).toLinearSpace();
  Calendar.enableSpecularAntiAliasing = true;

  let Chrystal = scene.getMaterialByName("Chrystal");
  Chrystal.metallic = 1;
  Chrystal.emissiveColor = new Color3.FromInts(199, 199, 199).toLinearSpace();
  Chrystal.enableSpecularAntiAliasing = true;

  let Dial = scene.getMaterialByName("Dial");
  // Dial.albedoTexture = new Texture(
  //   "Rolex_V2_Albedo_Black.jpg",
  //   this.scene,
  //   false,
  //   false
  // );
  // Dial.emissiveTexture = new Texture(
  //   "Rolex_V2_Albedo_Black.jpg",
  //   this.scene,
  //   true,
  //   true
  // );
  //Dial.emissiveColor=new Color3(255, 255, 255)
  let Dial_Seconds = scene.getMaterialByName("Dial_Seconds");
  Dial_Seconds.emissiveColor = new Color3.FromInts(
    106,
    106,
    106
  ).toLinearSpace();
  Dial_Seconds.metallic = 1;
  Dial_Seconds.roughness = 0;
  Dial_Seconds.enableSpecularAntiAliasing = true;

  let Glass = scene.getMaterialByName("Glass");
  Glass.metallic = 0.34;
  Glass.roughness = 0.1;
  Glass.isRefractionEnabled = true;
  Glass.enableSpecularAntiAliasing = true;

  let Hand_Emmission = scene.getMaterialByName("Hand Emmission");
  Hand_Emmission.emissiveColor = new Color3.FromInts(
    217,
    217,
    217
  ).toLinearSpace();
  Hand_Emmission.enableSpecularAntiAliasing = true;

  let InnerBezel = scene.getMaterialByName("InnerBezel");
  InnerBezel.albedoColor = new Color3.FromInts(219, 181, 118).toLinearSpace();
  InnerBezel.metallic = 1;
  InnerBezel.enableSpecularAntiAliasing = true;

  let Magnifier_Glass = scene.getMaterialByName("Magnifier_Glass");
  Magnifier_Glass.metallic = 0.51;
  Magnifier_Glass.roughness = 0;
  Magnifier_Glass.enableSpecularAntiAliasing = true;

  let Marker_Emmission = scene.getMaterialByName("Marker Emmission");
  Marker_Emmission.emissiveColor = new Color3.FromInts(
    217,
    217,
    217
  ).toLinearSpace();
  Marker_Emmission.enableSpecularAntiAliasing = true;

  let Markers = scene.getMaterialByName("Markers");
  Markers.emissiveColor = new Color3.FromInts(219, 181, 118).toLinearSpace();
  Markers.albedoColor = new Color3.FromInts(219, 181, 118).toLinearSpace();
  Markers.metallic = 1;
  Markers.enableSpecularAntiAliasing = true;

  let Silver_A = scene.getMaterialByName("Silver_A");
  let Silver_A_Bump = scene.getMaterialByName("Silver_A_Bump");
  let Silver_B = scene.getMaterialByName("Silver_B");
  let Silver_B_Bump = scene.getMaterialByName("Silver_B_Bump");

  Silver_A.albedoColor = new Color3.FromInts(215, 215, 215).toLinearSpace();
  Silver_A_Bump.albedoColor = new Color3.FromInts(
    215,
    215,
    215
  ).toLinearSpace();
  Silver_B.albedoColor = new Color3.FromInts(219, 181, 118).toLinearSpace();
  Silver_B_Bump.albedoColor = new Color3.FromInts(
    219,
    181,
    118
  ).toLinearSpace();

  Silver_A.roughness = 0.0;
  Silver_A_Bump.roughness = 0.09;
  Silver_B.roughness = 0.0;
  Silver_B_Bump.roughness = 0.09;

  Silver_A.metallic = 1;
  Silver_A_Bump.metallic = 1;
  Silver_B.metallic = 1;
  Silver_B_Bump.metallic = 1;

  Silver_A.maxSimultaneousLights = 10;
  Silver_A_Bump.maxSimultaneousLights = 10;
  Silver_B.maxSimultaneousLights = 10;
  Silver_B_Bump.maxSimultaneousLights = 10;

  Silver_A.enableSpecularAntiAliasing = true;
  Silver_A_Bump.enableSpecularAntiAliasing = true;
  Silver_B.enableSpecularAntiAliasing = true;
  Silver_B_Bump.enableSpecularAntiAliasing = true;

  //   var light1 = SpotLightofScene(scene);
  //   light1.angle=359
  //   // Default intensity is 1. Let's dim the light a small amount
  //   light1.intensity = 0.05;
  //  light1.position=new Vector3(0.002, 0.235, 0.299)
  //  //diffusecolor FFEBB1
  //   // 244, 250, 255
  //   var light2 = SpotLightofScene(scene);
  //   light1.angle=359
  //   // Default intensity is 1. Let's dim the light a small amount
  //   light2.intensity = 0.05;
  //  light2.position=new Vector3(-0.003, 0.349, -0.137)

  //   var light3 = SpotLightofScene(scene);
  //   light3.angle=359
  //   // Default intensity is 1. Let's dim the light a small amount
  //   light3.intensity = 0.05;
  //  light3.position=new Vector3(-0.157, 0.088, 0.010)

  //   var light4 = SpotLightofScene(scene);
  //   light4.angle=359
  //   // Default intensity is 1. Let's dim the light a small amount
  //   light4.intensity = 0.2;
  //  light4.position=new Vector3(0.002, 0.044, -0.000)

  //  var light5 =PointLightofScene(scene);

  //  // Default intensity is 1. Let's dim the light a small amount
  //  light5.intensity = 1;
  // light5.position=new Vector3(0.002, 0.044, -0.000)

  scene3 = scene;

  var light6 = PointLightofScene(scene);

  // Default intensity is 1. Let's dim the light a small amount
  light6.intensity = 1;
  light6.position = new Vector3(0.002, 0.175, -0.044);

  // var shadowGenerator = new ShadowGenerator(1024, light);
  // shadowGenerator.getShadowMap().renderList.push(Root);
  // shadowGenerator.setDarkness(0.5);
  // shadowGenerator.usePoissonSampling = true;
  // shadowGenerator.bias = 0;

  // Root.receiveShadows = true;
  // Root.receiveShadows = true;

  let mirror = new MirrorTexture("mirror", 512, scene);
  mirror.mirrorPlane = new Plane(0, -1, 0, -0.01);
  mirror.renderList = Root.meshes;
  let disc = MeshBuilder.CreateDisc("disc", { radius: 1 }, scene);
  disc.position = new Vector3(-0.028, -0.028, 0);
  disc.rotation = new Vector3(Math.PI / 2, 0, 0);
  let discMaterial = new StandardMaterial("discMaterial", scene);
  //discMaterial.reflectionTexture = mirror;
  discMaterial.backFaceCulling = false;
  discMaterial.alpha = 1;
  discMaterial.emissiveColor = new Color3.FromInts(
    144,
    144,
    144
  ).toLinearSpace();
  //discMaterial.reflectionTexture.adaptiveBlurKernel = 45; //45
  // 244, 250, 255
  discMaterial.diffuseColor = new Color3.FromInts(244, 250, 255);
  disc.material = discMaterial;
  // Our built-in 'box' shape.
  //box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
  //light.excludedMeshes=[disc]
  // light1.excludedMeshes=[disc]
  // light2.excludedMeshes=[disc]
  // light3.excludedMeshes=[disc]

  let inner_buckle = scene.getMeshByName("InnerBuckle_LQ");
  let outer_buckle = scene.getMeshByName("OuterBuckle_LQ");
  light6.excludedMeshes = [disc, inner_buckle, outer_buckle];

  // Our built-in 'ground' shape.
  //MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

  // var shadowGenerator = new ShadowGenerator(1024, light);
  // shadowGenerator.getShadowMap().renderList.push(Root,disc);
  // shadowGenerator.setDarkness(0.5);
  // shadowGenerator.usePoissonSampling = true;
  // shadowGenerator.bias = 0;

  // disc.receiveShadows = true;
  // Root.receiveShadows = true;

  const SelectedMeshColor = (e) => {
    if (e.detail.color === "presset1.jpg") {
      console.log(
        e.detail.color,
        e.detail.mesh,
        "console.log(e.detail.color,e.detail.mesh)"
      );
      InnerBezel.albedoColor = new Color3.FromInts(
        219,
        181,
        118
      ).toLinearSpace();

      Bezel_Markers.albedoColor = new Color3.FromInts(
        219,
        181,
        118
      ).toLinearSpace();
      Bezel_Markers.emissiveColor = new Color3.FromInts(
        219,
        181,
        118
      ).toLinearSpace();
      Silver_A.albedoColor = new Color3.FromInts(215, 215, 215).toLinearSpace();
      Silver_A_Bump.albedoColor = new Color3.FromInts(
        215,
        215,
        215
      ).toLinearSpace();
      Silver_B.albedoColor = new Color3.FromInts(219, 181, 118).toLinearSpace();
      Silver_B_Bump.albedoColor = new Color3.FromInts(
        219,
        181,
        118
      ).toLinearSpace();
    }
    if (e.detail.color === "presset2.jpg") {
      console.log(
        e.detail.color,
        e.detail.mesh,
        "console.log(e.detail.color,e.detail.mesh)"
      );
      InnerBezel.albedoColor = new Color3.FromInts(
        215,
        215,
        215
      ).toLinearSpace();

      Bezel_Markers.albedoColor = new Color3.FromInts(
        215,
        215,
        215
      ).toLinearSpace();
      Bezel_Markers.emissiveColor = new Color3.FromInts(
        215,
        215,
        215
      ).toLinearSpace();
      Silver_A.albedoColor = new Color3.FromInts(215, 215, 215).toLinearSpace();
      Silver_A_Bump.albedoColor = new Color3.FromInts(
        215,
        215,
        215
      ).toLinearSpace();
      Silver_B.albedoColor = new Color3.FromInts(215, 215, 215).toLinearSpace();
      Silver_B_Bump.albedoColor = new Color3.FromInts(
        215,
        215,
        215
      ).toLinearSpace();
    } else if (
      e.detail.color === "blue.jpg" ||
      e.detail.color === "blue1.jpg"
    ) {
      if (e.detail.mesh === 0) {
        console.log("test");
        Bezel.albedoColor = new Color3.FromInts(25, 64, 143).toLinearSpace();
      }
      if (e.detail.mesh === 1) {
        console.log("test");
        Dial.albedoTexture = new Texture(
          "Rolex_V2_Albedo_Blue.jpg",
          this.scene,
          false,
          false
        );
        Dial.emissiveTexture = new Texture(
          "Rolex_V2_Albedo_Blue.jpg",
          this.scene,
          false,
          false
        );
      }
    } else if (
      e.detail.color === "green.jpg" ||
      e.detail.color === "green1.jpg"
    ) {
      if (e.detail.mesh === 0) {
        console.log("test");
        Bezel.albedoColor = new Color3.FromInts(33, 92, 59).toLinearSpace();
      }
      if (e.detail.mesh === 1) {
        console.log("test");
        Dial.albedoTexture = new Texture(
          "Rolex_V2_Green.jpg",
          scene,
          false,
          false
        );
        Dial.emissiveTexture = new Texture(
          "Rolex_V2_Green.jpg",
          scene,
          false,
          false
        );
      }
    } else if (
      e.detail.color === "black.jpg" ||
      e.detail.color === "black1.jpg"
    ) {
      if (e.detail.mesh === 0) {
        console.log("test");
        Bezel.albedoColor = new Color3.FromInts(18, 18, 18).toLinearSpace();
      }
      if (e.detail.mesh === 1) {
        console.log("test");
        Dial.albedoTexture = new Texture(
          "Rolex_V2_Albedo_Black.jpg",
          this.scene,
          false,
          false
        );
        Dial.emissiveTexture = new Texture(
          "Rolex_V2_Albedo_Black.jpg",
          this.scene,
          false,
          false
        );
      }
    }
  };
  window.addEventListener("selectedMesh-color", SelectedMeshColor);
  //light.setDirectionToTarget(new Vector3.Zero);

  var light = new DirectionalLight("dirLight", new Vector3(1, -1, 0), scene);
  light.intensity = 0.7;
  light.position = new Vector3(0, 1, 0);
  light.setDirectionToTarget(new Vector3(0, -1, 0));
  light.diffuseColor = new Color3(90, 90, 90);

  disc.receiveShadows = true;

  var shadowGenerator = new ShadowGenerator(1024, light);
  shadowGenerator.useBlurExponentialShadowMap = true;
  shadowGenerator.addShadowCaster(Root);
  //shadowGenerator.bias /= 2;
  //shadowGenerator.bias /= 2;

  shadowGenerator.getShadowMap().renderList.push(Root);
  shadowGenerator.frustumEdgeFalloff = 1.0;
  shadowGenerator.darkness = 0.28;
  shadowGenerator.blurScale = 4;
  shadowGenerator.useKernelBlur = true;
  shadowGenerator.blurKernel = 64;

  var speed = -0.003;
  var myfunc;
  function Func() {
    speed = -0.003;
  }
  scene.onPointerObservable.add((pointerInfo) => {
    switch (pointerInfo.type) {
      case PointerEventTypes.POINTERDOWN:
        clearTimeout(myfunc);
        speed = 0;
        break;
      case PointerEventTypes.POINTERUP:
        myfunc = setTimeout(Func, 1500);
        break;
    }
  });
  scene.registerBeforeRender(function () {
    Root.addRotation(0.0, speed, 0.0);
  });
}

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {};

const zoomIn = (scene) => {
  var camera = scene.getCameraByName("Camera");
  TweenMax.to(camera, 1, {
    radius: camera.radius - 0.01,
    ease: Power2.easeOut,
  });
};
const zoomOut = (scene) => {
  var camera = scene.getCameraByName("Camera");
  TweenMax.to(camera, 1, {
    radius: camera.radius + 0.01,
    ease: Power2.easeOut,
  });
};

export default function Scene3d(props) {
  window.onpointerdown = () => {
    props.handleClick();
  };
  return (
    <div className="Scene unselectable">
      <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        onRender={onRender}
        id="renderCanvas"
      />
      <button
        onClick={() => zoomIn(scene3)}
        className="icon-btn2"
        style={{ outline: "none" }}
      >
        <img className="icons" src="plus.png" draggable="false" />
      </button>
      <button
        onClick={() => zoomOut(scene3)}
        className="icon-btn3"
        style={{ outline: "none" }}
      >
        <img className="icons" src="minus.png" draggable="false" />
      </button>
    </div>
  );
}
