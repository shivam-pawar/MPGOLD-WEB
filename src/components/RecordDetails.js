import React, { useEffect, useState } from "react";
import { Container, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import firebaseDB from "../config/firebase";
import moment from "moment";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

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
  useEffect(() => {
    const recordRef = firebaseDB.ref("mpgold-web-default-rtdb");
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

  const handleCustomerNameFilter = (e) => {
    const value = e.target.value;
    const recordRef = firebaseDB.ref("mpgold-web-default-rtdb");
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
    const recordRef = firebaseDB.ref("mpgold-web-default-rtdb");
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
    const recordRef = firebaseDB.ref("mpgold-web-default-rtdb");
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

  const deleteUser = React.useCallback(
    (id) => () => {
      if (window.confirm("Are you sure?"))
        firebaseDB.ref("mpgold-web-default-rtdb").child(id).remove();
    },
    []
  );

  const columns = [
    {
      field: "serial_number",
      type: "number",
      headerName: "SR Number",
      width: 100,
    },
    {
      field: "report_date",
      headerName: "Date",
      width: 130,
      type: "date",
      valueFormatter: (params) => {
        const valueFormatted = moment(params.value).format("DD-MM-YYYY");
        return `${valueFormatted}`;
      },
    },
    {
      field: "customer_name",
      headerName: "Customer Name",
      width: 200,
    },
    {
      field: "sample_type",
      headerName: "Sample Type",
      width: 170,
    },
    { field: "weight", headerName: "Weight", width: 140 },
    {
      field: "gold_purity",
      headerName: "Gold Purity",
      width: 140,
    },
    {
      field: "silver_purity",
      headerName: "Silver Purity",
      width: 140,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: classes.actions,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Container maxWidth="lg" className={classes.root}>
      <TextField
        className="c-name"
        id="standard-customerName"
        label="Search Customer"
        name="customerName"
        onChange={handleCustomerNameFilter}
      />
      <TextField
        className="c-sr"
        type="number"
        id="standard-customerName"
        label="Search SR No."
        name="customerName"
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
        name="dateTime"
        onChange={handleDateFilter}
        defaultValue={moment(Date().toLocaleString()).format("YYYY-MM-DD")}
      />
      <div style={{ height: 800, width: "95%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={50}
          rowsPerPageOptions={[5]}
        />
      </div>
    </Container>
  );
}

export default RecordDetails;
