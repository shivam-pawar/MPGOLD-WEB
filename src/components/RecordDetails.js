import React, { useEffect, useState } from "react";
import { Container, TextField } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import firebaseDB from "../config/firebase";
import moment from "moment";

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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#f50057",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function RecordDetails() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    const recordRef = firebaseDB.ref("mpgold-web-default-rtdb");
    recordRef.on("value", (snapshot) => {
      const records = snapshot.val();
      const recordList = [];
      for (let id in records) {
        recordList.push(records[id]);
      }
      setData(recordList);
    });
  }, []);
  return (
    <Container maxWidth="lg" className={classes.root}>
      <TextField
        className="c-name"
        id="standard-customerName"
        label="Search Customer"
        name="customerName"
      />
      <TextField
        className="c-sr"
        type="number"
        id="standard-customerName"
        label="Search SR No."
        name="customerName"
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
      />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">SR Number</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Customer Name</StyledTableCell>
              <StyledTableCell align="left">Sample Type</StyledTableCell>
              <StyledTableCell align="left">Weight</StyledTableCell>
              <StyledTableCell align="left">Gold Purity</StyledTableCell>
              <StyledTableCell align="left">Silver Purity</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.serial_number}>
                <StyledTableCell component="th" scope="row">
                  {row.serial_number}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {moment(row.report_date).format("DD-MM-YYYY")}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.customer_name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.sample_type}
                </StyledTableCell>
                <StyledTableCell align="left">{row.weight}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.gold_purity}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.silver_purity}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default RecordDetails;
