import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SummaryTable from "./SummaryTable";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
  root_input: {
    paddingLeft: "8px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid grey",
    borderRadius: "5px",
    font: "normal normal 300 17px/35px Roboto",
    color: "grey",
    height: "40px",
    marginRight: "18px",
  },
});

const summaryBaseUrl = "http://localhost:8080/stockapp/getSummaryDetail/";

class Summary extends React.Component {
  state = {
    isHighestPriceChecked: false,
    isHighestVolumeChecked: false,
    symbol: "",
    shouldDisplayTable: false,
    summaryTableData: {},
    errorMessage: "",
  };

  handleCheckBoxChange = (event) => {
    if (event.target.name === "Highest Price") {
      this.setState({ isHighestPriceChecked: event.target.checked });
    } else {
      this.setState({ isHighestVolumeChecked: event.target.checked });
    }
  };

  handleSubmit = (event) => {
    const { symbol } = this.state;
    if (symbol === "") {
      this.setState({
        errorMessage: "Please enter the Symbol and click Submit",
      });
    } else {
      axios.get(`${summaryBaseUrl}${symbol}`).then((res) => {
        if (res.data.error) {
          this.setState({
            errorMessage: res.data.error,
          });
        } else {
          this.setState({
            summaryTableData: res.data.summaryDetail,
            shouldDisplayTable: true,
            errorMessage: "",
          });
        }
      });
    }
  };

  handleBack = () => {
    this.setState({ shouldDisplayTable: false });
  };

  handleSymbolInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ symbol: inputValue, errorMessage: "" });
  };

  render() {
    const {
      isHighestPriceChecked,
      isHighestVolumeChecked,
      shouldDisplayTable,
      summaryTableData,
      errorMessage,
      symbol,
    } = this.state;
    const { classes } = this.props;
    return (
      <div className="flex justify-center">
        {!shouldDisplayTable && (
          <div className="flex flex-col justify-center mt-10 space-y-2">
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Information</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isHighestPriceChecked}
                      onChange={this.handleCheckBoxChange}
                      name="Highest Price"
                    />
                  }
                  label="Highest Price"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isHighestVolumeChecked}
                      onChange={this.handleCheckBoxChange}
                      name="Highest Volume"
                    />
                  }
                  label="Highest Volume"
                />
              </FormGroup>
              {/* <FormHelperText>Be careful</FormHelperText> */}
            </FormControl>
            <div>
              <span style={{ padding: 16 }}>Symbol:</span>
              <Input
                classes={{ root: classes.root_input }}
                value={symbol}
                autoFocus
                disableUnderline
                onChange={this.handleSymbolInputChange}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
            {errorMessage !== "" && (
              <Alert severity="error">{errorMessage}</Alert>
            )}
          </div>
        )}
        {shouldDisplayTable && (
          <div className="flex flex-col justify-center mt-10 space-y-2">
            <SummaryTable
              handleBack={this.handleBack}
              data={summaryTableData}
              isHighestVolumeChecked={isHighestVolumeChecked}
              isHighestPriceChecked={isHighestPriceChecked}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Summary);
