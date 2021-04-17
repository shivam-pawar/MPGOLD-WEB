import React from "react";
import { Container, TextField } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
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

const rows = [
  {
    serial_number: 1,
    report_date: "01/04/2021",
    customer_name: "Shivam",
    sample_type: "Dhali",
    weight: "10.800",
    purity: "91.67",
  },
  {
    serial_number: 2,
    report_date: "02/04/2021",
    customer_name: "Test",
    sample_type: "Dhali",
    weight: "12.800",
    purity: "87.60",
  },
];

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
              <StyledTableCell align="left">Purity</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.serial_number}>
                <StyledTableCell component="th" scope="row">
                  {row.serial_number}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.report_date}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.customer_name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.sample_type}
                </StyledTableCell>
                <StyledTableCell align="left">{row.weight}</StyledTableCell>
                <StyledTableCell align="left">{row.purity}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default RecordDetails;
