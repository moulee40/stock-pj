import React from "react";

class SummaryTable extends React.Component {
  state = {};
  render() {
    const { handleBack } = this.props;
    return (
      <div className="space-y-14">
        <h1 className="text-3xl">Summary Table come here</h1>
        <h1 className="cursor-pointer underline text-3xl" onClick={handleBack}>
          Back
        </h1>
      </div>
    );
  }
}

export default SummaryTable;
