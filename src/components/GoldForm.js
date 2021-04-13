import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import printJS from "print-js";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3),
      flexGrow: 1,
    },
    "& > .c-name": {
      margin: theme.spacing(3),
      width: "50ch",
    },
  },
  result: {
    "& > *": {
      width: "15ch",
      margin: theme.spacing(2),
    },
  },
  preview: {
    width: "100%",
  },
  paper: {
    flexGrow: 1,
  },
}));
function GoldForm() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [isGold, setIsGold] = React.useState("gold");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleReportChange = (event) => {
    setIsGold(event.target.value);
  };
  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          centered
        >
          <Tab label="REPORT" {...a11yProps(0)} />
          <Tab label="PRINT PREVIEW" {...a11yProps(1)} />
        </Tabs>
      </Paper>
      <CssBaseline />
      <TabPanel value={value} index={0}>
        <Container maxWidth="lg">
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            id="demo"
          >
            <TextField
              className="c-name"
              id="standard-secondary"
              label="Customer Name"
            />
            <TextField
              id="standard-number"
              label="Serial Number"
              type="number"
            />
            <TextField id="standard-secondary" label="Sample Type" />
            <TextField id="standard-secondary" label="Weight" />
            <TextField
              id="datetime-local"
              label="Date and Time"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              disabled
            />
            <TextField id="standard-secondary" label="Karat" />
            <TextField id="standard-secondary" label="Total" />
          </form>

          <Grid container spacing={3}>
            <Grid item xs={8}>
              <form className={classes.result}>
                <TextField id="standard-gold" variant="outlined" label="Gold" />{" "}
                <TextField
                  id="standard-silver"
                  variant="outlined"
                  label="Silver"
                />{" "}
                <TextField
                  id="standard-copper"
                  variant="outlined"
                  label="Copper"
                />{" "}
                <TextField id="standard-Zinc" variant="outlined" label="Zinc" />{" "}
                <TextField
                  id="standard-cadmium"
                  variant="outlined"
                  label="Cadmium"
                />{" "}
                <TextField
                  id="standard-iridium"
                  variant="outlined"
                  label="Iridium"
                />{" "}
                <TextField
                  id="standard-ruthenium"
                  variant="outlined"
                  label="Ruthenium"
                />{" "}
                <TextField
                  id="standard-osmium"
                  variant="outlined"
                  label="Osmium"
                />{" "}
                <TextField
                  id="standard-nickel"
                  variant="outlined"
                  label="Nickel"
                />{" "}
                <TextField
                  id="standard-rhodium"
                  variant="outlined"
                  label="Rhodium"
                />
                <TextField
                  id="standard-manganese"
                  variant="outlined"
                  label="Manganese"
                />{" "}
                <TextField id="standard-tin" variant="outlined" label="Tin" />{" "}
                <TextField id="standard-lead" variant="outlined" label="Lead" />{" "}
                <TextField
                  id="standard-platinum"
                  variant="outlined"
                  label="Platinum"
                />{" "}
                <TextField id="standard-iron" variant="outlined" label="Iron" />{" "}
                <TextField
                  id="standard-bismuth"
                  variant="outlined"
                  label="Bismuth"
                />{" "}
                <TextField
                  id="standard-palladium"
                  variant="outlined"
                  label="Palladium"
                />{" "}
                <TextField
                  id="standard-cobalt"
                  variant="outlined"
                  label="Cobalt"
                />{" "}
                <TextField
                  id="standard-rhenium"
                  variant="outlined"
                  label="Rhenium"
                />{" "}
                <TextField
                  id="standard-tungsten"
                  variant="outlined"
                  label="Tungsten"
                />
              </form>
            </Grid>
            <Grid item xs={4} className={classes.result}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Report Type:</FormLabel>
                <br />
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={isGold}
                  onChange={handleReportChange}
                >
                  <FormControlLabel
                    value="gold"
                    control={<Radio />}
                    label="Gold"
                  />
                  <FormControlLabel
                    value="silver"
                    control={<Radio />}
                    label="Silver"
                  />
                </RadioGroup>
              </FormControl>
              <Button size="large" variant="contained" color="secondary">
                Reset
              </Button>
            </Grid>
          </Grid>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={10} className={classes.preview}>
            <div id="something">
              <h1>Testing</h1>
              <p>---------------------------------------------------</p>
              {value}
              {isGold}
            </div>
          </Grid>
          <Grid item xs={2} className={classes.result}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={() => printJS("something", "html")}
            >
              Print
            </Button>
          </Grid>
        </Grid>
      </TabPanel>
    </React.Fragment>
  );
}

export default GoldForm;
