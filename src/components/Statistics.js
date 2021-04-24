import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
});

class Statistics extends React.Component {
  state = {
    count: "",
    exchangeValue: "all",
  };

  handleDisplayChange = (event) => {
    this.setState({ count: event.target.value });
  };

  handleExchangeRadioButton = (event) => {
    this.setState({ exchangeValue: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { count, exchangeValue } = this.state;
    return (
      <div className="flex justify-center">
        <div className="flex flex-col justify-center mt-10 space-y-2">
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Display
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={count}
              onChange={this.handleDisplayChange}
              label="Display"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Last 10</MenuItem>
              <MenuItem value={100}>Last 100</MenuItem>
              <MenuItem value={200}>Last 250</MenuItem>
            </Select>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend">Exchange</FormLabel>
            <RadioGroup
              aria-label="exchange"
              name="exchange1"
              value={exchangeValue}
              onChange={this.handleExchangeRadioButton}
            >
              <FormControlLabel value="all" control={<Radio />} label="ALL" />
              <FormControlLabel value="amex" control={<Radio />} label="AMEX" />
              <FormControlLabel value="nyse" control={<Radio />} label="NYSE" />
              <FormControlLabel
                value="nasdaq"
                control={<Radio />}
                label="NASDAQ"
              />
            </RadioGroup>
          </FormControl>

          <TextField
            id="outlined-search"
            label="Symbol"
            type="search"
            variant="outlined"
          />
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Statistics);
