import React, { Component } from "react";
import {
  Button,
  Tab,
  Tabs,
  Container,
  Col,
  Nav,
  Item,
  Link,
  Content,
  Pane,
  Row,
  Navbar,
  Card,
  NavDropdown,
  Image,
} from "react-bootstrap";

var gold = ["blue.jpg", "green.jpg", "black.jpg"];
var silver = ["blue1.jpg", "green1.jpg", "black1.jpg"];
var Pressets = ["presset1.jpg", "presset2.jpg"];

export default function Panel(props) {
  return (
    <div className="PanelBottom">
      <Tabs
        className="TabsBottom"
        defaultActiveKey={1}
        animation={true}
        id="noanim-tab-example"
      >
        <Tab
          eventKey={1}
          title={
            <div className="TabDiv">
              <img style={{ width: "100%", padding: "20%" }} src="bezel.png" />{" "}
              <span className="titlesoficons">Bezel</span>
            </div>
          }
        >
          <div style={{ marginTop: "10px" }}>
            <Row style={{ margin: "2%" }}>
              {gold.map((project, index) => (
                <Col key={index} md="3" mx="2">
                  <Button
                    onClick={() => props.getColorPressed(project, 0)}
                    id="ButtonColor"
                    style={{ marginTop: "10px" }}
                    variant="light"
                  >
                    <Image id="ImageColor" src={project} roundedCircle fluid />
                  </Button>
                </Col>
              ))}
            </Row>
          </div>
        </Tab>
        <Tab
          eventKey={2}
          title={
            <div className="TabDiv">
              <img
                style={{
                  width: "90%",
                  marginTop: "2%",
                  marginBottom: "10%",
                  padding: "15%",
                }}
                src="dial.png"
              />{" "}
              <span className="titlesoficons">Dial</span>
            </div>
          }
        >
          <div style={{ marginTop: "10px" }}>
            <Row style={{ margin: "2%" }}>
              {silver.map((project, index) => (
                <Col key={index} md="3" mx="2">
                  <Button
                    onClick={() => props.getColorPressed(project, 1)}
                    id="ButtonColor"
                    style={{ marginTop: "10px" }}
                    variant="light"
                  >
                    <Image
                      src={project}
                      id="ImageTexture"
                      roundedCircle
                      fluid
                    />
                  </Button>
                </Col>
              ))}
            </Row>
          </div>{" "}
        </Tab>

        <Tab
          eventKey={3}
          title={
            <div className="TabDiv">
              <img
                style={{
                  width: "90%",
                  marginTop: "2%",
                  marginBottom: "10%",
                  padding: "15%",
                }}
                src="preset.png"
              />{" "}
              <span className="titlesoficons">Strap</span>
            </div>
          }
        >
          <div style={{ marginTop: "10px" }}>
            <Row style={{ margin: "2%" }}>
              {Pressets.map((project, index) => (
                <Col key={index} md="3" mx="2">
                  <Button
                    onClick={() => props.getColorPressed(project, 1)}
                    id="ButtonColor"
                    style={{ marginTop: "10px" }}
                    variant="light"
                  >
                    <Image
                      src={project}
                      id="ImagePresset"
                      roundedCircle
                      fluid
                    />
                  </Button>
                </Col>
              ))}
            </Row>
          </div>{" "}
        </Tab>
      </Tabs>
    </div>
  );
}
