import React, { Component } from "react";

class Cat extends Component {
  render(props) {
    const { mouse } = this.props;
    console.log(mouse);
    return (
      <div
        style={{
          position: "absolute",
          left: mouse.X,
          top: mouse.Y
        }}
      >
        <span>Here You are</span>
      </div>
    );
  }
}

class Mouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouse: { X: 0, Y: 0 }
    };
  }

  handleMouseMove = e => {
    console.log("X", e.clientX, "Y", e.clientY);
    this.setState({
      mouse: { X: e.clientX, Y: e.clientY }
    });
  };

  render() {
    return (
      <div style={{ height: "900px" }} onMouseMove={this.handleMouseMove}>
        {/* <Cat mouse={this.state.mouse} /> */}
        {this.props.render(this.state.mouse)}
      </div>
    );
  }
}

class MouseTracker extends Component {
  render() {
    return (
      <div style={{ marginTop: "200px" }}>
        <h1>move the mouse around</h1>
        <Mouse render={mouse => <Cat mouse={mouse} />} />
      </div>
    );
  }
}

export default MouseTracker;
