import React from "react";
import {Line} from 'react-chartjs-2';

class MovingAverageChart extends React.Component {
  state = {};
  render() {
	const data = {
		labels: ['January', 'February', 'March',
				 'April', 'May'],
		datasets: [
		  {
			label: '50 days Moving Average',
			fill: false,
			lineTension: 0.5,
			backgroundColor: 'blue',
			borderColor: 'blue',
			borderWidth: 2,
			data: [10, 20, 40, 30, 80]
		  },
		  {
			label: '200 days Moving Average',
			fill: false,
			lineTension: 0.5,
			backgroundColor: 'green',
			borderColor: 'green',
			borderWidth: 2,
			data: [20, 60, 30, 80, 96,34]
		  },
		  {
			label: 'Price',
			fill: false,
			lineTension: 0.5,
			backgroundColor: 'red',
			borderColor: 'red',
			borderWidth: 2,
			data: [12, 30, 80, 81, 96,34]
		  }
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

export default MovingAverageChart;
