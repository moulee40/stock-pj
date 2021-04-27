import React from "react";
import CanvasJSReact from './canvasjs.react';


class FinancialAnalysisTable extends React.Component {
	constructor() {
	super();
	// this.toggleDataSeries = this.toggleDataSeries.bind(this);
}

render() {
	

	return (
	<div>
     	<h1 className="cursor-pointer underline text-3xl" onClick={this.props.handleBack}>
          Back
        </h1>
		<span> Table comes here </span>
	</div>
	);
}
}
export default FinancialAnalysisTable;
