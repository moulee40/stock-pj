import React from 'react';
import Button from "@material-ui/core/Button";
import { Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import SingleChart from "./SingleChart";

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
});
class Analysis extends React.Component {
    state = { 
        is50Dayschecked: false,
        is200Dayschecked: false,
        isShouldDisplayGraph: false,
     }
     handleCheckBoxChange = (event) => {
        if (event.target.name === "50Days Average") {
          this.setState({ is50Dayschecked: event.target.checked });
        } else {
          this.setState({ is200Dayschecked: event.target.checked });
        }
      };

      handleBack = () => {
        this.setState({ isShouldDisplayGraph: false });
      }; 

      handleSubmit = (event) => {
        this.setState({ isShouldDisplayGraph: true });
      };

    render() {
        const {
            is50Dayschecked,is200Dayschecked,isShouldDisplayGraph
        } = this.state;
        const { classes } = this.props;
        return (
          <div className="flex justify-center">
              {!isShouldDisplayGraph && (
              <div className="flex flex-col justify-center mt-10 space-y-2">
                  <h1>Quarter Analysis</h1>
                <div>
                   <span style={{padding:16}}>Symbol:</span>
                      <Input classes={{ root: classes.root_input }} autoFocus disableUnderline/>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                 </div>
                 <h1 style={{marginTop:60}}>Stock Trend</h1>
                 <div>
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
                      <Input classes={{ root: classes.root_input }} autoFocus disableUnderline/>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                 </div>
                 <h1 style={{marginTop:60}}>Stock Comparison</h1>
                 <div>
                   <span style={{padding:16}}>Symbol 1:</span>
                      <Input classes={{ root: classes.root_input }} autoFocus disableUnderline/>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                 </div>
                 <div>
                   <span style={{padding:16}}>Symbol 2:</span>
                      <Input classes={{ root: classes.root_input }} autoFocus disableUnderline/>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                 </div>
              </div>
               )}
                {isShouldDisplayGraph && (
                    <div style={{width:'100%',marginTop:'100px'}}>
                        <SingleChart handleBack={this.handleBack} />
                    </div>
                )}
          </div>
        );
      }
}
 
export default withStyles(styles)(Analysis);


