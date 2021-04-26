import React from 'react';
import Button from "@material-ui/core/Button";
import { Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FinancialAnalysisChart from "./FinancialAnalysisChart";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const financialAnalysisBaseUrl = 'http://localhost:8080/stockapp/getFinancialReportDetail/';


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
        fromDate: '2000-04-26',
        toDate: '2006-04-26',
        financialAnalysisInput:'',
        financialAnalysisData:[],
        isAlertDialogOpen:false,
        alertMessage:''
     }

     financialAnalysis = (event) => {
      const{financialAnalysisInput,fromDate,toDate} = this.state;
      const params = {
        fromDate:fromDate,toDate:toDate
      };
      const financialAnalysisUrl = financialAnalysisBaseUrl.concat(financialAnalysisInput);
    axios.get(financialAnalysisUrl,{params}).then(res=>{
      if(!res.data.error){
        this.setState({
            financialAnalysisData:res.data.financialDetail,
            isShouldDisplayGraph:true
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
               
    });
  }; 
  
  handleFromDate = (event) => {
    this.setState({
      fromDate:event.target.value
    })
   };

   handleToDate = (event) => {
    this.setState({
      toDate:event.target.value
    })
   };

   financialAnalysisInputChange = (event) => {
    const inputValue = event.target.value;
  this.setState({ financialAnalysisInput: inputValue});
};


handleClose = () => {
  this.setState({ isAlertDialogOpen : false,alertMessage:''});
};
    
    render() {
        const {
          isShouldDisplayGraph,fromDate,toDate,financialAnalysisData,isAlertDialogOpen,alertMessage
        } = this.state;
        const { classes } = this.props;
        return (
          <div className="flex justify-center">
              {!isShouldDisplayGraph && (
              <div className="flex flex-col justify-center mt-10 space-y-2">
                <div style={{display:'flex',marginTop:'50px'}}>
                    <form className={classes.container} noValidate>
                        <TextField
                          id="date"
                          label="From"
                          type="date"
                          defaultValue="2000-04-26"
                          className={classes.textField}
                          onChange = {this.handleFromDate}
                        />
                      </form>
                      <form className={classes.container} noValidate>
                        <TextField
                          id="date"
                          label="To"
                          type="date"
                          defaultValue="2006-04-26"
                          className={classes.textField}
                          onChange = {this.handleToDate}
                        />
                      </form>
                    </div>
                <div style={{marginTop:50}}>
                   <span style={{padding:16}}>Symbol:</span>
                      <Input classes={{ root: classes.root_input }}  onChange={this.financialAnalysisInputChange} autoFocus disableUnderline/>
                        <Button variant="contained" color="primary" onClick={this.financialAnalysis}>
                            Submit
                        </Button>
                 </div>
              </div>
               )}
                {isShouldDisplayGraph && (
                    <div style={{width:'50%',marginTop:'100px'}}>
                        <FinancialAnalysisChart handleBack={this.handleBack} data={financialAnalysisData}/>
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


