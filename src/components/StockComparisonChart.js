import React from "react";
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class StockComparisonChart extends React.Component {
	constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
  state = {};
  render() {
	const data = {
		animationEnabled: true,
		colorSet: "colorSet2",
		title: {
			text: "IBM Corporation   vs   Microsoft Corporation"
		},
		axisX: {
			valueFormatString: "MMMM-YYYY"
		},
		axisY: {
			prefix: "$",
		},
		toolTip: {
			shared: true
		},
		legend: {
			cursor: "pointer",
			itemclick: this.toggleDataSeries,
			verticalAlign: "top"
		},
		data: [{
			type: "line",
			name: "Stock 1",
			showInLegend: true,
			xValueFormatString: "MMMM-YYYY",
			yValueFormatString: "$#,##0",
			dataPoints: [
				{ x: new Date(2017, 0), y: 27500 },
				{ x: new Date(2017, 1), y: 29000 },
				{ x: new Date(2017, 2), y: 22000 },
				{ x: new Date(2017, 3), y: 26500 },
				{ x: new Date(2017, 4), y: 33000 },
				{ x: new Date(2017, 5), y: 37000 },
				{ x: new Date(2017, 6), y: 32000 },
				{ x: new Date(2017, 7), y: 27500 },
				{ x: new Date(2017, 8), y: 29500 },
				{ x: new Date(2017, 9), y: 43000 },
				{ x: new Date(2017, 10), y: 55000},
				{ x: new Date(2017, 11), y: 39500 }
			]
		},{
			type: "line",
			name: "Stock 2",
			showInLegend: true,
			xValueFormatString: "MMMM-YYYY",
			yValueFormatString: "$#,##0",
			dataPoints: [
				{ x: new Date(2017, 0), y: 38000 },
				{ x: new Date(2017, 1), y: 39000 },
				{ x: new Date(2017, 2), y: 35000 },
				{ x: new Date(2017, 3), y: 37000 },
				{ x: new Date(2017, 4), y: 42000 },
				{ x: new Date(2017, 5), y: 48000 },
				{ x: new Date(2017, 6), y: 41000 },
				{ x: new Date(2017, 7), y: 38000 },
				{ x: new Date(2017, 8), y: 42000 },
				{ x: new Date(2017, 9), y: 45000 },
				{ x: new Date(2017, 10), y: 48000 },
				{ x: new Date(2017, 11), y: 47000 }
			]
		}]
	}
		
		return (
		<div>
        <h1 className="cursor-pointer underline text-3xl" onClick={this.props.handleBack}>
          Back
        </h1>
		<CanvasJSChart options = {data}
			 onRef={ref => this.chart = ref}
		/>
		</div>
		);
	}
}

export default StockComparisonChart;
