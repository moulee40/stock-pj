import React from "react";
import {Line} from 'react-chartjs-2';

class StockComparisonChart extends React.Component {
  state = {};
  render() {
	const data = {
		labels: ['January', 'February', 'March',
				 'April', 'May'],
		datasets: [
		  {
			label: 'Stock 1',
			fill: false,
			lineTension: 0.5,
			backgroundColor: 'blue',
			borderColor: 'blue',
			borderWidth: 2,
			data: [300, 160, 320, 40, 200]
		  },
		  {
			label: 'Stock 2',
			fill: false,
			lineTension: 0.5,
			backgroundColor: 'green',
			borderColor: 'green',
			borderWidth: 2,
			data: [20, 60, 30, 80, 96,34]
		  },
		 
		]
	  };
		
		return (
		<div>
        <h1 className="cursor-pointer underline text-3xl" onClick={this.props.handleBack}>
          Back
        </h1>
		<Line
          data={data}
          options={{
            // title:{
            //   display:true,
            //   text:'Average Rainfall per month',
            //   fontSize:20
            // },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
		</div>
		);
	}
}

export default StockComparisonChart;
