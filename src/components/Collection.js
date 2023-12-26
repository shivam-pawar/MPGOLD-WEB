import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Container,
  InputAdornment,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import firebaseDB from "../config/firebase";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3),
      flexGrow: 1,
    },
    "& > .c-name": {
      margin: theme.spacing(3),
      width: "10ch",
    },
  },
}));
function Collection() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [tunchRates, setTunchRates] = useState({
    gold: 50,
    silver: 100,
  });
  const [silverData, setSilverData] = useState([]);
  const [goldData, setGoldData] = useState([]);

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
  useEffect(() => {
    setSilverData(
      data.filter((value) => value.reportType === "silver").length *
        tunchRates.silver
    );
    setGoldData(
      data.filter((value) => value.reportType === "gold").length *
        tunchRates.gold
    );
  }, [data, tunchRates]);
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
  const handleTunchRateChange = (e) => {
    const { value } = e.target;
    setTunchRates({
      ...tunchRates,
      [e.target.name]: [value],
    });
  };

  return (
    <>
      <Container className={classes.root}>
        <TextField
          id="datetime-local"
          label="Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          name="report_date"
          onChange={handleDateFilter}
          defaultValue={moment(Date().toLocaleString()).format("YYYY-MM-DD")}
        />
        <TextField
          id="standard-goldRate"
          label="Gold Tunch Rate"
          type="number"
          name="gold"
          defaultValue={tunchRates.gold}
          onChange={handleTunchRateChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">&#8377;</InputAdornment>
            ),
          }}
        />
        <TextField
          id="standard-silverRate"
          label="Silver Tunch Rate"
          type="number"
          name="silver"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">&#8377;</InputAdornment>
            ),
          }}
          defaultValue={tunchRates.silver}
          onChange={handleTunchRateChange}
        />
      </Container>
      <Container>
        <Grid container alignItems="center" alignContent="center">
          <Card variant="outlined" style={{ margin: 22, width: "150px" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                GOLD
              </Typography>
              <Typography variant="h5" component="div">
                &#8377;
                {goldData}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                ({data.filter((value) => value.reportType === "gold").length}
                &#215;
                {tunchRates.gold})
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined" style={{ margin: 22, width: "150px" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                SILVER
              </Typography>
              <Typography variant="h5" component="div">
                &#8377;
                {silverData}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                ({data.filter((value) => value.reportType === "silver").length}
                &#215;
                {tunchRates.silver} )
              </Typography>
            </CardContent>
          </Card>
          <Card variant="outlined" style={{ margin: 22, width: "250px" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Total Collection
              </Typography>
              <Typography variant="h5" component="div">
                &#8377;
                {silverData + goldData}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                ({data?.length})
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </>
  );
}

export default Collection;
