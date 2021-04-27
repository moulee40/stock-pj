import React from "react";
import Table from '@material-ui/core/Table';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const StyledTableCell = withStyles((theme) => ({
	head: {
	  backgroundColor: theme.palette.common.black,
	  color: theme.palette.common.white,
	},
	body: {
	  fontSize: 14,
	},
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
	root: {
	  '&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	  },
	},
  }))(TableRow);

  function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
	// createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	// createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	// createData('Eclair', 262, 16.0, 24, 6.0),
	// createData('Cupcake', 305, 3.7, 67, 4.3),
	// createData('Gingerbread', 356, 16.0, 49, 3.9),
	{symbol:'APPL',year:'2018',month:'04',perShare:'$4',percentage:'20%',lotSize:'20',lotShare:'$80'},
	{symbol:'APPL',year:'2018',month:'04',perShare:'$4',percentage:'20%',lotSize:'20',lotShare:'$80'},
	{symbol:'APPL',year:'2018',month:'04',perShare:'$4',percentage:'20%',lotSize:'20',lotShare:'$80'},
	{symbol:'APPL',year:'2018',month:'04',perShare:'$4',percentage:'20%',lotSize:'20',lotShare:'$80'},
	{symbol:'APPL',year:'2018',month:'04',perShare:'$4',percentage:'20%',lotSize:'20',lotShare:'$80'}
  ];

class FinancialAnalysisTable extends React.Component {
	constructor() {
	super();
	// this.toggleDataSeries = this.toggleDataSeries.bind(this);
}

render() {
	const { classes } = this.props;

	return (
	<div>
     	<h1 className="cursor-pointer underline text-3xl" onClick={this.props.handleBack}>
          Back
        </h1>
		<TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Symbol</StyledTableCell>
            <StyledTableCell align="center">year</StyledTableCell>
            <StyledTableCell align="center">month</StyledTableCell>
            <StyledTableCell align="center">GL for month per share</StyledTableCell>
            <StyledTableCell align="center">Percentage</StyledTableCell>
			<StyledTableCell align="center">Lot size</StyledTableCell>
			<StyledTableCell align="center">GL for Lot size</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.symbol}>
              <StyledTableCell component="th" scope="row">{row.symbol}</StyledTableCell>
              <StyledTableCell align="center">{row.year}</StyledTableCell>
              <StyledTableCell align="center">{row.month}</StyledTableCell>
              <StyledTableCell align="center">{row.perShare}</StyledTableCell>
              <StyledTableCell align="center">{row.percentage}</StyledTableCell>
			  <StyledTableCell align="center">{row.lotSize}</StyledTableCell>
			  <StyledTableCell align="center">{row.lotShare}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
	</div>
	);
}
}
export default FinancialAnalysisTable;
