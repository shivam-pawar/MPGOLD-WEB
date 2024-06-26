/* eslint-disable */
import React, { useRef } from "react";
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
import Checkbox from "@material-ui/core/Checkbox";
import moment from "moment";
import RecordDetails from "./RecordDetails";
import PrintPreview from "./PrintPreview";
import Collection from "./Collection";

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
      width: "14ch",
      margin: theme.spacing(2),
    },
  },
  paper: {
    flexGrow: 1,
  },
}));

function UserForm() {
  const classes = useStyles();
  const [editDateChecked, setEditDateChecked] = React.useState(false);

  const [customerValues, setCustomerValues] = React.useState({
    customerName: "",
    srNumber: 0,
    sampleType: "Dhali",
    weight: (0.0).toFixed(3),
    dateTime: editDateChecked
      ? null
      : moment(Date().toLocaleString()).format("YYYY-MM-DDTHH:mm"),
    karat: "",
  });

  const [concentrations, setConcentrations] = React.useState({
    gold: "0.00",
    silver: "0.00",
    copper: "0.00",
    zinc: "0.00",
    cadmium: "0.00",
    iridium: "0.00",
    ruthenium: "0.00",
    osmium: "0.00",
    nickel: "0.00",
    rhodium: "0.00",
    manganese: "0.00",
    tin: "0.00",
    lead: "0.00",
    platinum: "0.00",
    iron: "0.00",
    indium: "0.00",
    palladium: "0.00",
    cobalt: "0.00",
    rhenium: "0.00",
    tungsten: "0.00",
  });

  const [value, setValue] = React.useState(0);
  const [isGold, setIsGold] = React.useState("gold");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleReportChange = (event) => {
    setIsGold(event.target.value);
  };

  const handleConcentrationsChange = (e) => {
    const { value } = e.target;
    setConcentrations({
      ...concentrations,
      [e.target.name]: parseFloat(value).toFixed(2),
    });
  };

  const handleCustomerDetails = (e) => {
    const { value } = e.target;
    setCustomerValues({
      ...customerValues,
      [e.target.name]: value,
    });
  };

  const handleReset = () => {
    window.location.reload();
  };

  React.useEffect(() => {
    setCustomerValues({
      ...customerValues,
      karat: (concentrations.gold / 4.166667).toFixed(2),
    });
  }, [concentrations.gold]);

  const handleEditDateChange = (event) => {
    setEditDateChecked(event.target.checked);
  };

  const handleDatePickerChange = (event) => {
    setCustomerValues({
      ...customerValues,
      dateTime: event.target.value,
    });
  };

  React.useEffect(() => {
    setConcentrations({
      ...concentrations,
      copper: (
        100.0 -
        parseFloat(
          parseFloat(concentrations.gold) +
            parseFloat(concentrations.silver) +
            parseFloat(concentrations.zinc) +
            parseFloat(concentrations.cadmium) +
            parseFloat(concentrations.iridium) +
            parseFloat(concentrations.ruthenium) +
            parseFloat(concentrations.osmium) +
            parseFloat(concentrations.nickel) +
            parseFloat(concentrations.rhodium) +
            parseFloat(concentrations.manganese) +
            parseFloat(concentrations.tin) +
            parseFloat(concentrations.lead) +
            parseFloat(concentrations.platinum) +
            parseFloat(concentrations.iron) +
            parseFloat(concentrations.indium) +
            parseFloat(concentrations.palladium) +
            parseFloat(concentrations.cobalt) +
            parseFloat(concentrations.rhenium) +
            parseFloat(concentrations.tungsten)
        )
      ).toFixed(2),
    });
  }, [
    concentrations.gold,
    concentrations.silver,
    concentrations.zinc,
    concentrations.cadmium,
    concentrations.iridium,
    concentrations.ruthenium,
    concentrations.osmium,
    concentrations.nickel,
    concentrations.rhodium,
    concentrations.manganese,
    concentrations.tin,
    concentrations.lead,
    concentrations.platinum,
    concentrations.iron,
    concentrations.indium,
    concentrations.palladium,
    concentrations.cobalt,
    concentrations.rhenium,
    concentrations.tungsten,
  ]);

  return (
    <React.Fragment>
      <span className="App-Header">
        <Paper className={classes.paper}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            centered
          >
            <Tab label="REPORT" {...a11yProps(0)} />
            <Tab label="PRINT PREVIEW" {...a11yProps(1)} />
            <Tab label="RECORDS" {...a11yProps(2)} />
            <Tab label="Collection" {...a11yProps(3)} />
          </Tabs>
        </Paper>
      </span>
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
              id="standard-customerName"
              label="Customer Name"
              name="customerName"
              defaultValue={customerValues.customerName}
              onChange={handleCustomerDetails}
            />
            <TextField
              id="standard-serialNumber"
              label="Serial Number"
              type="number"
              name="srNumber"
              defaultValue={customerValues.srNumber}
              onChange={handleCustomerDetails}
            />
            <TextField
              id="standard-sampleType"
              label="Sample Type"
              name="sampleType"
              defaultValue={customerValues.sampleType}
              onChange={handleCustomerDetails}
            />
            <TextField
              id="standard-weight"
              label="Weight"
              name="weight"
              defaultValue={customerValues.weight}
              onChange={handleCustomerDetails}
            />
            <TextField
              id="datetime-local"
              label="Date and Time"
              type="datetime-local"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              name="dateTime"
              defaultValue={customerValues.dateTime}
              disabled={!editDateChecked}
              onChange={handleDatePickerChange}
            />
            <TextField
              id="standard-karat"
              label="Karat"
              name="karat"
              value={customerValues.karat}
              onChange={handleCustomerDetails}
              disabled
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={editDateChecked}
                  onChange={handleEditDateChange}
                  tabIndex={-1}
                />
              }
              label="Edit Date and Time"
            />
          </form>

          <Grid container spacing={3}>
            <Grid item xs={8}>
              <form className={classes.result}>
                <TextField
                  id="standard-gold"
                  variant="outlined"
                  label="GOLD"
                  name="gold"
                  defaultValue={concentrations.gold}
                  onChange={handleConcentrationsChange}
                  inputProps={{ style: { fontSize: 24 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
                <TextField
                  id="standard-silver"
                  variant="outlined"
                  label="SILVER"
                  name="silver"
                  defaultValue={concentrations.silver}
                  onChange={handleConcentrationsChange}
                  inputProps={{ style: { fontSize: 24 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
                <TextField
                  id="standard-copper"
                  variant="outlined"
                  label="COPPER"
                  name="copper"
                  value={concentrations.copper}
                  onChange={handleConcentrationsChange}
                  disabled
                  inputProps={{ style: { fontSize: 24 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
                <TextField
                  id="standard-zinc"
                  variant="outlined"
                  label="ZINC"
                  name="zinc"
                  defaultValue={concentrations.zinc}
                  onChange={handleConcentrationsChange}
                  inputProps={{ style: { fontSize: 24 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
                <TextField
                  id="standard-cadmium"
                  variant="outlined"
                  label="CADMIUM"
                  name="cadmium"
                  defaultValue={concentrations.cadmium}
                  onChange={handleConcentrationsChange}
                  inputProps={{ style: { fontSize: 24 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
                <TextField
                  id="standard-nickel"
                  variant="outlined"
                  label="NICKEL"
                  name="nickel"
                  defaultValue={concentrations.nickel}
                  onChange={handleConcentrationsChange}
                  inputProps={{ style: { fontSize: 24 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
                <TextField
                  id="standard-indium"
                  variant="outlined"
                  label="INDIUM"
                  name="indium"
                  defaultValue={concentrations.indium}
                  onChange={handleConcentrationsChange}
                  inputProps={{ style: { fontSize: 24 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
                <TextField
                  id="standard-lead"
                  variant="outlined"
                  label="LEAD"
                  name="lead"
                  defaultValue={concentrations.lead}
                  onChange={handleConcentrationsChange}
                  inputProps={{ style: { fontSize: 24 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
                <TextField
                  id="standard-ruthenium"
                  variant="outlined"
                  label="RUTHENIUM"
                  name="ruthenium"
                  defaultValue={concentrations.ruthenium}
                  onChange={handleConcentrationsChange}
                  inputProps={{ style: { fontSize: 24 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
                <TextField
                  id="standard-iridium"
                  variant="outlined"
                  label="IRIDIUM"
                  name="iridium"
                  defaultValue={concentrations.iridium}
                  onChange={handleConcentrationsChange}
                  inputProps={{ style: { fontSize: 24 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
                <TextField
                  id="standard-osmium"
                  variant="outlined"
                  label="OSMIUM"
                  name="osmium"
                  defaultValue={concentrations.osmium}
                  onChange={handleConcentrationsChange}
                  inputProps={{ style: { fontSize: 24 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
                <TextField
                  id="standard-iron"
                  variant="outlined"
                  label="IRON"
                  name="iron"
                  defaultValue={concentrations.iron}
                  onChange={handleConcentrationsChange}
                  inputProps={{ style: { fontSize: 24 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
                <TextField
                  id="standard-tin"
                  variant="outlined"
                  label="TIN"
                  name="tin"
                  defaultValue={concentrations.tin}
                  onChange={handleConcentrationsChange}
                  inputProps={{ style: { fontSize: 24 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
                <TextField
                  id="standard-manganese"
                  variant="outlined"
                  label="MANGANESE"
                  name="manganese"
                  defaultValue={concentrations.manganese}
                  onChange={handleConcentrationsChange}
                  inputProps={{ style: { fontSize: 24 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
                <TextField
                  id="standard-rhodium"
                  variant="outlined"
                  label="RHODIUM"
                  name="rhodium"
                  defaultValue={concentrations.rhodium}
                  onChange={handleConcentrationsChange}
                  inputProps={{ style: { fontSize: 24 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
                <TextField
                  id="standard-platinum"
                  variant="outlined"
                  label="PLATINUM"
                  name="platinum"
                  defaultValue={concentrations.platinum}
                  onChange={handleConcentrationsChange}
                  inputProps={{ style: { fontSize: 24 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
                <TextField
                  id="standard-palladium"
                  variant="outlined"
                  label="PALLADIUM"
                  name="palladium"
                  defaultValue={concentrations.palladium}
                  onChange={handleConcentrationsChange}
                  inputProps={{ style: { fontSize: 24 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
                <TextField
                  id="standard-cobalt"
                  variant="outlined"
                  label="COBALT"
                  name="cobalt"
                  defaultValue={concentrations.cobalt}
                  onChange={handleConcentrationsChange}
                  inputProps={{ style: { fontSize: 24 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
                <TextField
                  id="standard-rhenium"
                  variant="outlined"
                  label="RHENIUM"
                  name="rhenium"
                  defaultValue={concentrations.rhenium}
                  onChange={handleConcentrationsChange}
                  inputProps={{ style: { fontSize: 24 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
                <TextField
                  id="standard-tungsten"
                  variant="outlined"
                  label="TUNGSTEN"
                  name="tungsten"
                  defaultValue={concentrations.tungsten}
                  onChange={handleConcentrationsChange}
                  inputProps={{ style: { fontSize: 24 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
              </form>
            </Grid>
            <Grid item xs={4} className={classes.result}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Report Type:</FormLabel>
                <br />
                <RadioGroup
                  aria-label="reportType"
                  name="reportType"
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
              <div style={{ width: "100%", display: "flex" }}>
                <div style={{ width: "40%" }}>
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={(e) => handleChange(e, 1)}
                  >
                    Preview
                  </Button>
                </div>
                <div style={{ width: "50%" }}>
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PrintPreview
          customerValues={customerValues}
          concentrations={concentrations}
          isGold={isGold}
          editDateChecked={editDateChecked}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RecordDetails />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Collection />
      </TabPanel>
    </React.Fragment>
  );
}

export default UserForm;
