import React, { useEffect, useState } from "react";
import { Container, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import firebaseDB from "../config/firebase";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import MUIDataTable from "mui-datatables";
import IconButton from "@mui/material/IconButton";
import EditRecord from "./EditRecord";
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
  table: {
    minWidth: 700,
  },
}));

function RecordDetails() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [isEditMode, setEditMode] = useState(false);
  useEffect(() => {
    const recordRef = firebaseDB.ref(process.env.REACT_APP_DATABASE_REF);
    recordRef
      .orderByChild("report_date")
      .startAt(moment(Date().toLocaleString()).format("YYYY-MM-DD"))
      .on("value", (snapshot) => {
        const records = snapshot.val();
        const recordList = [];
        for (let id in records) {
          recordList.push({
            ...records[id],
            id: id,
          });
        }
        setData(recordList);
      });
  }, []);
  const handleEditMode = (data) => {
    setEditMode(data);
  };
  const handleCustomerNameFilter = (e) => {
    const value = e.target.value;
    const recordRef = firebaseDB.ref(process.env.REACT_APP_DATABASE_REF);
    recordRef
      .orderByChild("customer_name")
      .startAt(value)
      .endAt(value + "\uf8ff")
      .on("value", (snapshot) => {
        const records = snapshot.val();
        const recordList = [];
        for (let id in records) {
          recordList.push({
            ...records[id],
            id: id,
          });
        }
        setData(recordList);
      });
  };

  const handleSRNumberFilter = (e) => {
    const value = e.target.value;
    const recordRef = firebaseDB.ref(process.env.REACT_APP_DATABASE_REF);
    recordRef
      .orderByChild("serial_number")
      .startAt(value)
      .endAt(value + "\uf8ff")
      .on("value", (snapshot) => {
        const records = snapshot.val();
        const recordList = [];
        for (let id in records) {
          recordList.push({
            ...records[id],
            id: id,
          });
        }
        setData(recordList);
      });
  };

  const handleDateFilter = (e) => {
    const value = e.target.value;
    const recordRef = firebaseDB.ref(process.env.REACT_APP_DATABASE_REF);
    recordRef
      .orderByChild("report_date")
      .startAt(moment(value).format("YYYY-MM-DD"))
      .endAt(value + "\uf8ff")
      .on("value", (snapshot) => {
        const records = snapshot.val();
        const recordList = [];
        for (let id in records) {
          recordList.push({
            ...records[id],
            id: id,
          });
        }
        setData(recordList);
      });
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure?"))
      firebaseDB.ref(process.env.REACT_APP_DATABASE_REF).child(id).remove();
  };

  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        display: false,
      },
    },
    {
      name: "serial_number",
      type: "number",
      label: "SR Number",
      width: 100,
    },
    {
      name: "report_date",
      label: "Date",
      width: 130,
      type: "date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) =>
          moment(new Date(value)).format("DD/MM/YY hh:mm:ss A"),
      },
    },
    {
      name: "customer_name",
      label: "Customer Name",
      width: 200,
    },
    {
      name: "sample_type",
      label: "Sample Type",
      width: 170,
    },
    { name: "weight", label: "Weight", width: 140 },
    {
      name: "gold_purity",
      label: "Gold Purity",
      width: 140,
    },
    {
      name: "silver_purity",
      label: "Silver Purity",
      width: 140,
    },
    {
      name: "Edit",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                handleEditMode(tableMeta);
              }}
              color="primary"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          );
        },
      },
    },
    {
      name: "Delete",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => deleteUser(tableMeta.rowData[0])}
              color="error"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          );
        },
      },
    },
  ];
  const options = {
    filterType: "checkbox",
    responsive: "standard",
    selectableRows: false,
    filter: false,
    print: false,
  };

  return isEditMode ? (
    <EditRecord data={isEditMode} />
  ) : (
    <>
      <Container className={classes.root}>
        <TextField
          className="c-name"
          id="standard-customerName"
          label="Search Customer"
          name="customer_name"
          onChange={handleCustomerNameFilter}
        />
        <TextField
          className="c-srnumber"
          type="number"
          id="standard-customerName"
          label="Search SR No."
          name="serial_number"
          onChange={handleSRNumberFilter}
        />
        <TextField
          id="datetime-local"
          label="Date and Time"
          type="date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          name="report_date"
          onChange={handleDateFilter}
          defaultValue={moment(Date().toLocaleString()).format("YYYY-MM-DD")}
        />
      </Container>
      <MUIDataTable data={data} columns={columns} options={options} />
    </>
  );
}

export default RecordDetails;
