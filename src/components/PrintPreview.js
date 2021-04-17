import React from "react";
import printJS from "print-js";
import Divider from "@material-ui/core/Divider";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
  separator: {
    width: "70%",
    border: `1px solid black`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    "& svg": {
      margin: theme.spacing(1.5),
    },
    "& hr": {
      margin: theme.spacing(0, 0.5),
    },
  },
}));

function PrintPreview({ customerValues, concentrations, isGold }) {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item xs={10} className={classes.preview}>
        <div id="something" className="font-settings">
          <div className="main-report" id="main-report">
            <div className="customer-details">
              <div className="name-time-sr">
                <div className="customer-name">
                  Name: {customerValues.customerName}
                </div>
                <div className="report-time">
                  Time: {moment(Date().toLocaleString()).format("hh:mm:ss a")}
                </div>
                <div className="customer-sr">
                  Serial No. : {customerValues.srNumber}
                </div>
              </div>
              <div className="date-sample">
                <div className="report-date">
                  Date: {moment(Date().toLocaleString()).format("Do MMMM YYYY")}
                </div>
                <div className="customer-sample">
                  Sample: {customerValues.sampleType}
                </div>
              </div>
            </div>
            <div className={classes.separator} id="first-separator">
              <Divider orientation="vertical" flexItem />
            </div>
            <div className="gold-karat-weight">
              {isGold === "gold" ? (
                <div className="std-gold">{"GOLD: " + concentrations.gold}</div>
              ) : (
                <div className="std-gold">
                  {"SILVER: " + concentrations.silver}
                </div>
              )}
              {isGold === "gold" ? (
                <div className="std-karat">KARAT: {customerValues.karat}</div>
              ) : (
                ""
              )}
              <div className="std-weight">
                WEIGHT: {customerValues.weight + " gram"}
              </div>
            </div>
            <div className={classes.separator} id="second-separator">
              <Divider orientation="vertical" flexItem />
            </div>
            <div className="std-result-set">
              <div className="first-block-element">
                {isGold === "gold" ? (
                  <div className="font-settings">Silver</div>
                ) : (
                  <div className="font-settings">Gold</div>
                )}
                <div className="font-settings">Copper</div>
                <div>Zinc</div>
                <div>Cadmium</div>
                <div>Iridium</div>
                <div>Ruthenium</div>
              </div>

              <div className="first-block-element-concentration">
                {isGold === "gold" ? (
                  <div>: {concentrations.silver}</div>
                ) : (
                  <div>: {concentrations.gold}</div>
                )}

                <div>: {concentrations.copper}</div>
                <div>: {concentrations.zinc}</div>
                <div>: {concentrations.cadmium}</div>
                <div>: {concentrations.iridium}</div>
                <div>: {concentrations.ruthenium}</div>
              </div>

              <div className="second-block-element">
                <div>Osmium</div>
                <div>Nickel</div>
                <div>Rhodium</div>
                <div>Manganese</div>
                <div>Tin</div>
                <div>Lead</div>
              </div>

              <div className="second-block-element-concentration">
                <div>: {concentrations.osmium}</div>
                <div>: {concentrations.nickel}</div>
                <div>: {concentrations.rhodium}</div>
                <div>: {concentrations.manganese}</div>
                <div>: {concentrations.tin}</div>
                <div>: {concentrations.lead}</div>
              </div>

              <div className="vl"></div>

              <div className="third-block-element">
                <div>Platinum</div>
                <div>Iron</div>
                <div>Bismuth</div>
                <div>Cobalt</div>
                <div>Rhenium</div>
                <div>Tungsten</div>
              </div>

              <div className="third-block-element-concentration">
                <div>: {concentrations.platinum}</div>
                <div>: {concentrations.iron}</div>
                <div>: {concentrations.bismuth}</div>
                <div>: {concentrations.cobalt}</div>
                <div>: {concentrations.rhenium}</div>
                <div>: {concentrations.tungsten}</div>
              </div>

              <div className="v2"></div>
            </div>
          </div>
          <div id="something" className="font-settings">
            <div className="second-main-report" id="main-report">
              <div className="customer-details">
                <div className="name-time-sr">
                  <div className="customer-name">
                    Name: {customerValues.customerName}
                  </div>
                  <div className="report-time">
                    Time: {moment(Date().toLocaleString()).format("hh:mm:ss a")}
                  </div>
                  <div className="customer-sr">
                    Serial No. : {customerValues.srNumber}
                  </div>
                </div>
                <div className="date-sample">
                  <div className="report-date">
                    Date:{" "}
                    {moment(Date().toLocaleString()).format("Do MMMM YYYY")}
                  </div>
                  <div className="customer-sample">
                    Sample: {customerValues.sampleType}
                  </div>
                </div>
              </div>
              <div className={classes.separator} id="first-separator">
                <Divider orientation="vertical" flexItem />
              </div>
              <div className="gold-karat-weight">
                {isGold === "gold" ? (
                  <div className="std-gold">
                    {"GOLD: " + concentrations.gold}
                  </div>
                ) : (
                  <div className="std-gold">
                    {"SILVER: " + concentrations.silver}
                  </div>
                )}
                {isGold === "gold" ? (
                  <div className="std-karat">KARAT: {customerValues.karat}</div>
                ) : (
                  ""
                )}
                <div className="std-weight">
                  WEIGHT: {customerValues.weight + " gram"}
                </div>
              </div>
              <div className={classes.separator} id="second-separator">
                <Divider orientation="vertical" flexItem />
              </div>
              <div className="std-result-set">
                <div className="first-block-element">
                  {isGold === "gold" ? (
                    <div className="font-settings">Silver</div>
                  ) : (
                    <div className="font-settings">Gold</div>
                  )}
                  <div className="font-settings">Copper</div>
                  <div>Zinc</div>
                  <div>Cadmium</div>
                  <div>Iridium</div>
                  <div>Ruthenium</div>
                </div>

                <div className="first-block-element-concentration">
                  {isGold === "gold" ? (
                    <div>: {concentrations.silver}</div>
                  ) : (
                    <div>: {concentrations.gold}</div>
                  )}

                  <div>: {concentrations.copper}</div>
                  <div>: {concentrations.zinc}</div>
                  <div>: {concentrations.cadmium}</div>
                  <div>: {concentrations.iridium}</div>
                  <div>: {concentrations.ruthenium}</div>
                </div>

                <div className="second-block-element">
                  <div>Osmium</div>
                  <div>Nickel</div>
                  <div>Rhodium</div>
                  <div>Manganese</div>
                  <div>Tin</div>
                  <div>Lead</div>
                </div>

                <div className="second-block-element-concentration">
                  <div>: {concentrations.osmium}</div>
                  <div>: {concentrations.nickel}</div>
                  <div>: {concentrations.rhodium}</div>
                  <div>: {concentrations.manganese}</div>
                  <div>: {concentrations.tin}</div>
                  <div>: {concentrations.lead}</div>
                </div>

                <div className="vl"></div>

                <div className="third-block-element">
                  <div>Platinum</div>
                  <div>Iron</div>
                  <div>Bismuth</div>
                  <div>Cobalt</div>
                  <div>Rhenium</div>
                  <div>Tungsten</div>
                </div>

                <div className="third-block-element-concentration">
                  <div>: {concentrations.platinum}</div>
                  <div>: {concentrations.iron}</div>
                  <div>: {concentrations.bismuth}</div>
                  <div>: {concentrations.cobalt}</div>
                  <div>: {concentrations.rhenium}</div>
                  <div>: {concentrations.tungsten}</div>
                </div>

                <div className="v2"></div>
              </div>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={2} className={classes.result}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() =>
            printJS({
              printable: "something",
              type: "html",
              targetStyles: ["*"],
            })
          }
        >
          Print
        </Button>
      </Grid>
    </Grid>
  );
}

export default PrintPreview;
