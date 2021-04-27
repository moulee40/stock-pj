import React from 'react';
import Button from "@material-ui/core/Button";
import { Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FinancialAnalysisChart from "./FinancialAnalysisChart";
import FinancialAnalysisTable from "./FinancialAnalysisTable";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';


const graphAnalysisBaseUrl = 'http://localhost:8080/stockapp/getFinancialReportDetail/';
const tableAnalysisBaseUrl = 'http://localhost:8080/stockapp/getMonthlyFinancialDetail/';



const styles = theme => ({
    root_input:{
        paddingLeft:"8px",
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        border: "1px solid grey",
        borderRadius: "5px",
        font: "normal normal 300 17px/35px Roboto",
        color: "grey",
        height:"40px",
        marginRight:"18px",
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      container: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingRight:'50px'
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
});
class Financial extends React.Component {
    constructor(){
        super();
    }
    state = { 
        isShouldDisplayGraph: false,
        isShowResultGraph:false,
        isShowResultTable:false,
        graphFromDate: '2000-04-26',
        graphToDate: '2006-04-26',
        tableFromDate: '2000-04-26',
        tableToDate: '2006-04-26',
        graphAnalysisInput:'',
        tableAnalysisInput:'',
        graphAnalysisData:[],
        tableAnalysisData:[],
        isAlertDialogOpen:false,
        alertMessage:'',
        tableAnalysisLotInput:'',
     }

     graphAnalysis = (event) => {
      const{graphAnalysisInput,graphFromDate,graphToDate} = this.state;
      const params = {
        fromDate:graphFromDate,toDate:graphToDate
      };
      const graphAnalysisUrl = graphAnalysisBaseUrl.concat(graphAnalysisInput);
    axios.get(graphAnalysisUrl,{params}).then(res=>{
      if(!res.data.error){
        this.setState({
          graphAnalysisData:res.data.financialDetail,
            isShouldDisplayGraph:true,
            isShowResultGraph:true
        })
      }
      else{
        this.setState({
          isAlertDialogOpen:true,
          alertMessage:res.data.error
      })
    }
    })
  };

  tableAnalysis = (event) => {
    const{tableAnalysisInput,tableFromDate,tableToDate,tableAnalysisLotInput} = this.state;
    const params = {
      fromDate:tableFromDate,toDate:tableToDate,lotSize:tableAnalysisLotInput
    };
    const tableAnalysisUrl = tableAnalysisBaseUrl.concat(tableAnalysisInput);
  axios.get(tableAnalysisUrl,{params}).then(res=>{
    if(!res.data.error){
      this.setState({
        tableAnalysisData:res.data.monthlyReportDetail,
          isShouldDisplayGraph:true,
          isShowResultTable:true
      })
    }
    else{
      this.setState({
        isAlertDialogOpen:true,
        alertMessage:res.data.error
    })
  }
  })
};

  handleBack = () => {
    this.setState({ 
        isShouldDisplayGraph: false, 
        isShowResultGraph:false,
        isShowResultTable:false
    });
  }; 
  
  handleGraphFromDate = (event) => {
    this.setState({
      graphFromDate:event.target.value
    })
   };

   handleGraphToDate = (event) => {
    this.setState({
      graphToDate:event.target.value
    })
   };

   handleTableFromDate = (event) => {
    this.setState({
      tableFromDate:event.target.value
    })
   };

   handleTableToDate = (event) => {
    this.setState({
      tableToDate:event.target.value
    })
   };

   analysisGraphInputChange = (event) => {
    const inputValue = event.target.value;
  this.setState({ graphAnalysisInput: inputValue});
};

analysisTableInputChange = (event) => {
  const inputValue = event.target.value;
this.setState({ tableAnalysisInput: inputValue});
};

analysisTableLotInputChange = (event) => {
  const inputValue = event.target.value;
this.setState({ tableAnalysisLotInput: inputValue});
};


handleClose = () => {
  this.setState({ isAlertDialogOpen : false,alertMessage:''});
};


    
    render() {
        const {
          isShouldDisplayGraph,isShowResultTable,graphFromDate,graphToDate,graphAnalysisData,isAlertDialogOpen,alertMessage,isShowResultGraph,tableAnalysisData
        } = this.state;
        const { classes } = this.props;
        return (
          <div className="flex justify-center">
              {!isShouldDisplayGraph && (
              <div className="flex flex-col justify-center mt-10 space-y-2">
                <span style={{marginTop:'50px'}}> Financial Chart:</span>
                <div style={{display:'flex',marginLeft:40}}>
                    <form className={classes.container} noValidate>
                        <TextField
                          id="date"
                          label="From"
                          type="date"
                          defaultValue="2000-04-26"
                          className={classes.textField}
                          onChange = {this.handleGraphFromDate}
                        />
                      </form>
                      <form className={classes.container} noValidate>
                        <TextField
                          id="date"
                          label="To"
                          type="date"
                          defaultValue="2006-04-26"
                          className={classes.textField}
                          onChange = {this.handleGraphToDate}
                        />
                      </form>
                    </div>
                <div style={{marginTop:50,marginLeft:48}}>
                   <span style={{paddingRight:16}}>Symbol:</span>
                      <Input classes={{ root: classes.root_input }}  onChange={this.analysisGraphInputChange} autoFocus disableUnderline/>
                        <Button variant="contained" color="primary" onClick={this.graphAnalysis}>
                            Submit
                        </Button>
                 </div>
                 <span style={{marginTop:'50px'}}> Profit and Loss:</span>
                 <div style={{display:'flex',marginLeft:40}}>
                    <form className={classes.container} noValidate>
                        <TextField
                          id="date"
                          label="From"
                          type="date"
                          defaultValue="2000-04-26"
                          className={classes.textField}
                          onChange = {this.handleTableFromDate}
                        />
                      </form>
                      <form className={classes.container} noValidate>
                        <TextField
                          id="date"
                          label="To"
                          type="date"
                          defaultValue="2006-04-26"
                          className={classes.textField}
                          onChange = {this.handleTableToDate}
                        />
                      </form>
                    </div>
                    
                    <div style={{marginTop:50,marginLeft:48}}>
                   <span style={{paddingRight:16}}>Symbol:</span>
                      <Input classes={{ root: classes.root_input }}  onChange={this.analysisTableInputChange} autoFocus disableUnderline/>
                 </div>
                 <div style={{marginTop:50}}>
                   <span style={{padding:16}}>Lot Quantity:</span>
                      <Input classes={{ root: classes.root_input }}  onChange={this.analysisTableLotInputChange} autoFocus disableUnderline/>
                        <Button variant="contained" color="primary" onClick={this.tableAnalysis}>
                            Submit
                        </Button>
                 </div>
              </div>
               )}
                {isShouldDisplayGraph && isShowResultGraph && (
                    <div style={{width:'50%',marginTop:'100px'}}>
                        <FinancialAnalysisChart handleBack={this.handleBack} data={graphAnalysisData}/>
                    </div>
                )}
                {isShouldDisplayGraph && isShowResultTable && (
                    <div style={{width:'50%',marginTop:'100px'}}>
                        <FinancialAnalysisTable handleBack={this.handleBack} data={tableAnalysisData}/>
                    </div>
                )}
                <Dialog
                      open={isAlertDialogOpen}
                      onClose={this.handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">{"Alert !"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                         {alertMessage}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button color="primary" onClick={this.handleClose}>
                         Close
                        </Button>
                      </DialogActions>
                    </Dialog>
               
          </div>
        );
      }
}
 
export default withStyles(styles)(Financial);


