import React from "react";
import Tab from "./Tab";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="space-y-5 h-screen flex flex-col">
        <h2 className="text-4xl font-semibold">UCM Finance Home</h2>
        <Tab />
      </div>
    );
  }
}

export default Main;
