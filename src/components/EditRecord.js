import { Container } from "@mui/material";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import RecordDetails from "./RecordDetails";
import firebaseDB from "../config/firebase";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

function EditRecord({ data }) {
  const [isFinished, setFinished] = useState(false);
  const [customerValues, setCustomerValues] = React.useState({
    customer_name: data.rowData[3],
    serial_number: data.rowData[1],
    sample_type: data.rowData[4],
    weight: data.rowData[5],
    update_date: moment(Date().toLocaleString()).format("YYYY-MM-DDTHH:mm"),
    gold_purity: data.rowData[6],
    silver_purity: data.rowData[7],
  });
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: "50px",
        flexGrow: 1,
      },
      "& > .c-name": {
        width: "50ch",
        margin: "10px",
      },
    },
    table: {
      minWidth: 700,
    },
  }));
  const classes = useStyles();
  const handleUpdatedValue = (e) => {
    const { value } = e.target;
    setCustomerValues({
      ...customerValues,
      [e.target.name]: value,
    });
  };
  const handleUpdate = () => {
    const recordRef = firebaseDB
      .ref(process.env.REACT_APP_DATABASE_REF)
      .child(data.rowData[0]);
    recordRef.update(customerValues);
    setFinished(true);
  };
  return !isFinished ? (
    <Container className={classes.root}>
      <form noValidate autoComplete="off" id="demo">
        <TextField
          style={{ padding: "10px" }}
          id="standard-customerName"
          label="Customer Name"
          name="customer_name"
          defaultValue={data.rowData[3]}
          onChange={handleUpdatedValue}
        />
        <TextField
          style={{ padding: "10px" }}
          id="standard-serialNumber"
          label="Serial Number"
          type="number"
          name="serial_number"
          defaultValue={data.rowData[1]}
          onChange={handleUpdatedValue}
        />
        <TextField
          style={{ padding: "10px" }}
          id="standard-sampleType"
          label="Sample Type"
          name="sample_type"
          defaultValue={data.rowData[4]}
          onChange={handleUpdatedValue}
        />
        <TextField
          style={{ padding: "10px" }}
          id="standard-weight"
          label="Weight"
          name="weight"
          defaultValue={data.rowData[5]}
          onChange={handleUpdatedValue}
        />
        <TextField
          style={{ padding: "10px" }}
          id="standard-gold"
          label="Gold Purity"
          name="gold_purity"
          defaultValue={data.rowData[6]}
          onChange={handleUpdatedValue}
        />
        <TextField
          style={{ padding: "10px" }}
          id="standard-silver"
          label="Silver Purity"
          name="silver_purity"
          defaultValue={data.rowData[7]}
          onChange={handleUpdatedValue}
        />
      </form>
      <Container
        style={{
          alignContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Button
          style={{ padding: "10px" }}
          variant="contained"
          color="success"
          onClick={() => handleUpdate()}
        >
          Update
        </Button>
        <Button
          style={{ padding: "10px", marginLeft: "10px" }}
          variant="outlined"
          color="secondary"
          onClick={() => setFinished(true)}
        >
          Cancel
        </Button>
      </Container>
    </Container>
  ) : (
    <RecordDetails />
  );
}

export default EditRecord;
