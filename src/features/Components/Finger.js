import React, { Component } from "react";

class Finger extends Component {
  render() {
    return (
      <div className="FingerPanel" style={{ display: this.props.display }}>
        <div className="Finger">
          <img
            className="rotate"
            src="Icon 3D Touch grey2.001.png"
            draggable="false"
          />
        </div>
      </div>
    );
  }
}

export default Finger;