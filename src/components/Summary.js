import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SummaryTable from "./SummaryTable";

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
});

class Summary extends React.Component {
  state = {
    isHighestPriceChecked: false,
    isHighestVolumeChecked: false,
    shouldDisplayTable: false,
  };

  handleCheckBoxChange = (event) => {
    if (event.target.name === "Highest Price") {
      this.setState({ isHighestPriceChecked: event.target.checked });
    } else {
      this.setState({ isHighestVolumeChecked: event.target.checked });
    }
  };

  handleSubmit = (event) => {
    this.setState({ shouldDisplayTable: true });
  };

  handleBack = () => {
    this.setState({ shouldDisplayTable: false });
  };

  render() {
    const {
      isHighestPriceChecked,
      isHighestVolumeChecked,
      shouldDisplayTable,
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
            <TextField
              id="outlined-search"
              label="Symbol"
              type="search"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </div>
        )}
        {shouldDisplayTable && (
          <div className="flex flex-col justify-center mt-10 space-y-2">
            <SummaryTable handleBack={this.handleBack} />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Summary);
