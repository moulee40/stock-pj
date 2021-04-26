import React from 'react';
import Button from "@material-ui/core/Button";
import { Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import QuarterAnalysisChart from "./QuarterAnalysisChart";
import MovingAverageChart from "./MovingAverageChart";
import StockComparisonChart from "./StockComparisonChart";
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const quarterAnalysisBaseUrl = 'http://localhost:8080/stockapp/getCurrentQuarterDetail/';
const stockComparisonBaseUrl = 'http://localhost:8080/stockapp/getComparisonDetail/';
const movingAverageBaseUrl = 'http://localhost:8080/stockapp/getMovingAverageDetail/';

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
});
class Analysis extends React.Component {
    constructor(){
        super();
    }
    state = { 
        is50Dayschecked: false,
        is200Dayschecked: false,
        isShouldDisplayGraph: false,
        isQuarterAnalysisGraph:false,
        isMovingAverageGraph:false,
        isStockComparisonGraph:false,
        QuarterAnalysisData:[],
        movingAverageData:[],
        stockComparisonFirstData:[],
        stockComparisonSecondData:[],
        quarterAnalysisInput:'',
        stockComparsionFirstInput:'',
        stockComparsionSecondInput:'',
        movingAverageInput:'',
        rangeInput:1,
        isAlertDialogOpen:false,
        alertMessage:''

     }
     handleCheckBoxChange = (event) => {
        if (event.target.name === "50Days Average") {
          this.setState({ is50Dayschecked: event.target.checked });
        } else {
          this.setState({ is200Dayschecked: event.target.checked });
        }
      };

      handleRangeInput = (event) => {
        const selectedIndex =  event.target.options.selectedIndex;
        if(selectedIndex===1){
          this.setState({ rangeInput: 5 });
        }
         
        if(selectedIndex===2){
          this.setState({ rangeInput: 10 });
        }
          
        if(selectedIndex===3){
          this.setState({ rangeInput: 20 });
        }
         
      };

      handleBack = () => {
        this.setState({ 
            isShouldDisplayGraph: false, 
            isQuarterAnalysisGraph:false,
            isMovingAverageGraph:false,
            isStockComparisonGraph:false,
            
        });
      }; 

      handleSubmit = (event) => {
        this.setState({ isShouldDisplayGraph: true });
      };

      handleQuarterAnalysis = (event) => {
          const{quarterAnalysisInput} = this.state;
          const quarterAnalysisUrl = quarterAnalysisBaseUrl.concat(quarterAnalysisInput);
        axios.get(quarterAnalysisUrl).then(res=>{
          if(!res.data.error){
            this.setState({
              QuarterAnalysisData:res.data.currentQuarterDetail,
              isShouldDisplayGraph:true,isQuarterAnalysisGraph:true
          })
          }else{
            this.setState({
              isAlertDialogOpen:true,
              alertMessage:res.data.error
          })
          }
        })
      };

      
      handleMovingAverage = (event) => {
        const{movingAverageInput,rangeInput} = this.state;
          const params = {
          years:rangeInput
        };
        const movingAverageUrl = movingAverageBaseUrl.concat(movingAverageInput);
      axios.get(movingAverageUrl,{params}).then(res=>{
        if(!res.data.error){
          this.setState({
            movingAverageData:res.data.movingAverageDetail,
              isShouldDisplayGraph:true,isMovingAverageGraph:true
          })}
          else{
            this.setState({
              isAlertDialogOpen:true,
              alertMessage:res.data.error
          })
        }
      })
      };

      
      handleStockComparison = (event) => {
        const{stockComparsionFirstInput,stockComparsionSecondInput} = this.state;
        const stockComparisonUrl = stockComparisonBaseUrl.concat(stockComparsionFirstInput)
                                   .concat('/').concat(stockComparsionSecondInput);
            axios.get(stockComparisonUrl).then(res=>{
              if(!res.data.error){
                this.setState({
                    stockComparisonFirstData:res.data.symbol1,
                    stockComparisonSecondData:res.data.symbol2,
                    isShouldDisplayGraph:true,isStockComparisonGraph:true
                })}
                else{
                  this.setState({
                    isAlertDialogOpen:true,
                    alertMessage:res.data.error
                })
              }
            })
      };

      handleQuarterAnalysisChange = (event) => {
          const inputValue = event.target.value;
        this.setState({ quarterAnalysisInput: inputValue});
      };

      handleStockComparsionFirstInputChange = (event) => {
        const inputValue = event.target.value;
      this.setState({ stockComparsionFirstInput: inputValue});
    };

    

    handleStockComparsionSecondInputChange = (event) => {
        const inputValue = event.target.value;
      this.setState({ stockComparsionSecondInput: inputValue});
    };

    handleMovingAverageInputChange = (event) => {
      const inputValue = event.target.value;
    this.setState({ movingAverageInput: inputValue});
  };

  handleClose = () => {
  this.setState({ isAlertDialogOpen : false,alertMessage:''});
};

    render() {
        const {
          rangeInput,QuarterAnalysisData,movingAverageData,stockComparisonFirstData,stockComparisonSecondData,is50Dayschecked,
          is200Dayschecked,isShouldDisplayGraph,isQuarterAnalysisGraph,isMovingAverageGraph,isStockComparisonGraph,isAlertDialogOpen,alertMessage
          
        } = this.state;
        const { classes } = this.props;
        return (
          <div className="flex justify-center">
              {!isShouldDisplayGraph && (
              <div className="flex flex-col justify-center mt-10 space-y-2">
                  <h1>Quarter Analysis</h1>
                <div>
                   <span style={{padding:16}}>Symbol:</span>
                      <Input classes={{ root: classes.root_input }} onChange={this.handleQuarterAnalysisChange}  autoFocus disableUnderline/>
                        <Button variant="contained" color="primary" onClick={this.handleQuarterAnalysis}>
                            Submit
                        </Button>
                 </div>
                 <h1 style={{marginTop:60}}>Stock Trend</h1>
                 <div>
                   <div style={{display:'flex',alignItems:'center'}}>
                    <span style={{padding:16}}>Range:</span>
                      <FormControl className={classes.formControl}>
                        <NativeSelect
                          defaultValue={1}
                          onChange={this.handleRangeInput}
                        >
                          <option value={1}>1 year</option>
                          <option value={5}>5 Year</option>
                          <option value={10}>10 Year</option>
                          <option value={20}>20 Year</option>
                        </NativeSelect>
                      </FormControl>
                     </div> 
                    <FormGroup>
                      <FormControlLabel control={
                        <Checkbox
                        checked={is50Dayschecked}
                        onChange={this.handleCheckBoxChange}
                        name="50Days Average"
                        />
                     }
                     label="50 Days Moving Average"
                        />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={is200Dayschecked}
                        onChange={this.handleCheckBoxChange}
                        name="200Days Average"
                        />
                    }
                    label="200 Days Moving Average"
                    />
              </FormGroup>
                   <span style={{padding:16}}>Symbol:</span>
                      <Input classes={{ root: classes.root_input }} onChange={this.handleMovingAverageInputChange} autoFocus disableUnderline/>
                        <Button variant="contained" color="primary" onClick={this.handleMovingAverage}>
                            Submit
                        </Button>
                 </div>
                 <h1 style={{marginTop:60}}>Stock Comparison</h1>
                 <div>
                   <span style={{padding:16}}>Symbol 1:</span>
                      <Input classes={{ root: classes.root_input }} onChange={this.handleStockComparsionFirstInputChange} autoFocus disableUnderline/>
                       
                 </div>
                 <div>
                   <span style={{padding:16}}>Symbol 2:</span>
                      <Input classes={{ root: classes.root_input }} onChange={this.handleStockComparsionSecondInputChange} autoFocus disableUnderline/>
                        <Button variant="contained" color="primary" onClick={this.handleStockComparison}>
                            Submit
                        </Button>
                 </div>
              </div>
               )}
                {isShouldDisplayGraph && isQuarterAnalysisGraph && (
                    <div style={{width:'50%',marginTop:'100px'}}>
                        <QuarterAnalysisChart handleBack={this.handleBack} data={QuarterAnalysisData}/>
                    </div>
                )}
                 {isShouldDisplayGraph && isMovingAverageGraph && (
                    <div style={{width:'50%',marginTop:'100px'}}>
                        <MovingAverageChart handleBack={this.handleBack} fiftyDaysAverage={is50Dayschecked} twoHundredDaysAverage={is200Dayschecked} data={movingAverageData}/>
                    </div>
                )}
                {isShouldDisplayGraph && isStockComparisonGraph && (
                    <div style={{width:'50%',marginTop:'100px'}}>
                        <StockComparisonChart handleBack={this.handleBack} data1={stockComparisonFirstData} data2={stockComparisonSecondData}/>
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
 
export default withStyles(styles)(Analysis);


