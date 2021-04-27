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


  

class FinancialAnalysisTable extends React.Component {
	constructor() {
	super();
}

render() {
	const { classes } = this.props;
	const rows=[];
	const financialAnalysisData =this.props.data;
	financialAnalysisData.map((data) => {
	  let tempData ={companyName:data.companyName,glPerLot:data.glPerLot,glPerShare:data.glPerShare,
					  glPercentage:data.glPercentage,lotSize:data.lotSize,month:data.month,symbol:data.symbol,year:data.year};
					  rows.push(tempData);
	});

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
              <StyledTableCell align="center">{row.glPerShare}</StyledTableCell>
              <StyledTableCell align="center">{row.glPercentage}</StyledTableCell>
			  <StyledTableCell align="center">{row.lotSize}</StyledTableCell>
			  <StyledTableCell align="center">{row.glPerLot}</StyledTableCell>
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
