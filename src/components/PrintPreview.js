import React from "react";
import moment from "moment";
import { Button } from "@material-ui/core";
import firebaseDB from "../config/firebase";
import LocalPrintshopIcon from "@material-ui/icons/LocalPrintshop";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

function PrintPreview({
  customerValues,
  concentrations,
  isGold,
  editDateChecked,
}) {
  const handlePostRequest = () => {
    const records = firebaseDB.ref(process.env.REACT_APP_DATABASE_REF);
    const customerName = handleCapitalization(customerValues.customerName);
    const sampleType = handleCapitalization(customerValues.sampleType);
    const dataToPush = {
      serial_number: customerValues.srNumber,
      report_date: editDateChecked
        ? customerValues.dateTime
        : moment(Date().toLocaleString()).format("YYYY-MM-DDTHH:mm:ss"),
      customer_name: customerName,
      sample_type: sampleType,
      weight: customerValues.weight,
      gold_purity: concentrations.gold,
      silver_purity: concentrations.silver,
      reportType: isGold === "gold" ? "gold" : "silver",
    };
    try {
      records.push(dataToPush);
      if (!window.navigator.onLine) {
        window.confirm(
          "You are Offline, Make sure you note down this record on Notebook. Once Internet back, I'll automatically push this record."
        );
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const handleCapitalization = (inputText) => {
    let input = inputText.trim();
    if (input !== null && input !== "") {
      const loweredCase = input.toLowerCase();
      var words = loweredCase.split(" ");
      var CapitalizedWords = [];
      words.forEach((element) => {
        CapitalizedWords.push(
          element[0].toUpperCase() + element.slice(1, element.length)
        );
      });
      return CapitalizedWords.join(" ");
    } else {
      return null;
    }
  };
  return (
    <>
      <span className="App-Header">
        <div className="printnsave">
          <Button
            size="large"
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            endIcon={<LocalPrintshopIcon />}
            onClick={() => {
              window.print();
              handlePostRequest();
            }}
          >
            Save And Print
          </Button>
        </div>
      </span>
      <div className="main-page">
        <div className="sub-page">
          <div className="customer-details">
            <div className="customer-name">
              Name: {handleCapitalization(customerValues.customerName)}
            </div>
            <div className="customer-time">
              Time:{" "}
              {editDateChecked
                ? moment(customerValues.dateTime.toLocaleString()).format(
                    "hh:mm:ss a"
                  )
                : moment(Date().toLocaleString()).format("hh:mm:ss a")}
            </div>
            <div className="customer-sr">
              Serial No.: {customerValues.srNumber}
            </div>
          </div>
          <div className="customer-date-sample">
            <div className="customer-date">
              Date:{" "}
              {editDateChecked
                ? moment(customerValues.dateTime.toLocaleString()).format(
                    "Do MMMM YYYY"
                  )
                : moment(Date().toLocaleString()).format("Do MMMM YYYY")}
            </div>
            <div className="customer-sample">
              Sample: {handleCapitalization(customerValues.sampleType)}
            </div>
          </div>
          <hr className="separator" />
          <div className="gold-karat-weight">
            {isGold === "gold" ? (
              <div className="gold">GOLD : {concentrations.gold}</div>
            ) : (
              <div className="gold">{"SILVER: " + concentrations.silver}</div>
            )}
            {isGold === "gold" ? (
              <div className="karat">KARAT: {customerValues.karat}</div>
            ) : (
              ""
            )}
            {isGold === "gold" ? (
              <div className="weight">
                WEIGHT : {customerValues.weight + " gm"}
              </div>
            ) : (
              <div className="silver-weight">
                WEIGHT : {customerValues.weight + " gm"}
              </div>
            )}
          </div>
          <hr className="separator" />
          <div className="concentration-block">
            <div className="first-block">
              <div className="element-block">
                <div className="elements">Copper</div>
                <div className="percentage">&nbsp; {concentrations.copper}</div>
              </div>
              <div className="element-block">
                {isGold === "gold" ? (
                  <>
                    <div className="elements">Silver</div>
                    <div className="percentage">
                      &nbsp; {concentrations.silver}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="elements">Gold</div>
                    <div className="percentage">
                      &nbsp; {concentrations.gold}
                    </div>
                  </>
                )}
              </div>
              <div className="element-block">
                <div className="elements">Zinc</div>

                <div className="percentage"> &nbsp; {concentrations.zinc}</div>
              </div>
              <div className="element-block">
                <div className="elements">Cadmium</div>
                <div className="percentage">
                  &nbsp; {concentrations.cadmium}
                </div>
              </div>
              <div className="element-block">
                <div className="elements">Lead</div>
                <div className="percentage"> &nbsp; {concentrations.lead}</div>
              </div>
              <div className="element-block">
                <div className="elements">Nickel</div>
                <div className="percentage">&nbsp; {concentrations.nickel}</div>
              </div>
            </div>
            <div className="second-block">
              <div className="element-block">
                <div className="elements">Iridium</div>
                <div className="percentage">
                  &nbsp; {concentrations.iridium}
                </div>
              </div>
              <div className="element-block">
                <div className="elements">Ruthenium</div>
                <div className="percentage">
                  &nbsp; {concentrations.ruthenium}
                </div>
              </div>
              <div className="element-block">
                <div className="elements">Osmium</div>
                <div className="percentage">&nbsp; {concentrations.osmium}</div>
              </div>
              <div className="element-block">
                <div className="elements">Tin</div>
                <div className="percentage"> &nbsp; {concentrations.tin}</div>
              </div>
              <div className="element-block">
                <div className="elements">Rhodium</div>
                <div className="percentage">
                  &nbsp; {concentrations.rhodium}
                </div>
              </div>
              <div className="element-block">
                <div className="elements">Iron</div>
                <div className="percentage"> &nbsp; {concentrations.iron}</div>
              </div>
            </div>
            <div className="third-block">
              <div className="element-block">
                <div className="elements">Palladium</div>
                <div className="percentage">
                  {" "}
                  &nbsp; {concentrations.palladium}
                </div>
              </div>
              <div className="element-block">
                <div className="elements">Cobalt</div>
                <div className="percentage">&nbsp; {concentrations.cobalt}</div>
              </div>
              <div className="element-block">
                <div className="elements">Rhenium</div>
                <div className="percentage">
                  &nbsp; {concentrations.rhenium}
                </div>
              </div>
              <div className="element-block">
                <div className="elements">Tungsten</div>
                <div className="percentage">
                  &nbsp; {concentrations.tungsten}
                </div>
              </div>
              <div className="element-block">
                <div className="elements">Manganese</div>
                <div className="percentage">
                  &nbsp; {concentrations.manganese}
                </div>
              </div>
              <div className="element-block">
                <div className="elements">Indium</div>
                <div className="percentage">&nbsp; {concentrations.indium}</div>
              </div>
            </div>
          </div>
          <div className="copy-form">
            <div className="customer-details">
              <div className="customer-name">
                Name: {handleCapitalization(customerValues.customerName)}
              </div>
              <div className="customer-time">
                Time:{" "}
                {editDateChecked
                  ? moment(customerValues.dateTime.toLocaleString()).format(
                      "hh:mm:ss a"
                    )
                  : moment(Date().toLocaleString()).format("hh:mm:ss a")}
              </div>
              <div className="customer-sr">
                Serial No.: {customerValues.srNumber}
              </div>
            </div>
            <div className="customer-date-sample">
              <div className="customer-date">
                Date:{" "}
                {editDateChecked
                  ? moment(customerValues.dateTime.toLocaleString()).format(
                      "Do MMMM YYYY"
                    )
                  : moment(Date().toLocaleString()).format("Do MMMM YYYY")}
              </div>
              <div className="customer-sample">
                Sample: {handleCapitalization(customerValues.sampleType)}
              </div>
            </div>
            <hr className="separator" />
            <div className="gold-karat-weight">
              {isGold === "gold" ? (
                <div className="gold">GOLD : {concentrations.gold}</div>
              ) : (
                <div className="gold">{"SILVER: " + concentrations.silver}</div>
              )}
              {isGold === "gold" ? (
                <div className="karat">KARAT: {customerValues.karat}</div>
              ) : (
                ""
              )}
              {isGold === "gold" ? (
                <div className="weight">
                  WEIGHT : {customerValues.weight + " gm"}
                </div>
              ) : (
                <div className="silver-weight">
                  WEIGHT : {customerValues.weight + " gm"}
                </div>
              )}
            </div>
            <hr className="separator" />
            <div className="concentration-block">
              <div className="first-block">
                <div className="element-block">
                  <div className="elements">Copper</div>
                  <div className="percentage">
                    &nbsp; {concentrations.copper}
                  </div>
                </div>
                <div className="element-block">
                  {isGold === "gold" ? (
                    <>
                      <div className="elements">Silver</div>
                      <div className="percentage">
                        &nbsp; {concentrations.silver}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="elements">Gold</div>
                      <div className="percentage">
                        &nbsp; {concentrations.gold}
                      </div>
                    </>
                  )}
                </div>
                <div className="element-block">
                  <div className="elements">Zinc</div>

                  <div className="percentage">&nbsp; {concentrations.zinc}</div>
                </div>
                <div className="element-block">
                  <div className="elements">Cadmium</div>
                  <div className="percentage">
                    &nbsp; {concentrations.cadmium}
                  </div>
                </div>
                <div className="element-block">
                  <div className="elements">Lead</div>
                  <div className="percentage">&nbsp; {concentrations.lead}</div>
                </div>
                <div className="element-block">
                  <div className="elements">Nickel</div>
                  <div className="percentage">
                    &nbsp; {concentrations.nickel}
                  </div>
                </div>
              </div>
              <div className="second-block">
                <div className="element-block">
                  <div className="elements">Iridium</div>
                  <div className="percentage">
                    &nbsp; {concentrations.iridium}
                  </div>
                </div>
                <div className="element-block">
                  <div className="elements">Ruthenium</div>
                  <div className="percentage">
                    &nbsp; {concentrations.ruthenium}
                  </div>
                </div>
                <div className="element-block">
                  <div className="elements">Osmium</div>
                  <div className="percentage">
                    &nbsp; {concentrations.osmium}
                  </div>
                </div>
                <div className="element-block">
                  <div className="elements">Tin</div>
                  <div className="percentage">&nbsp; {concentrations.tin}</div>
                </div>
                <div className="element-block">
                  <div className="elements">Rhodium</div>
                  <div className="percentage">
                    &nbsp; {concentrations.rhodium}
                  </div>
                </div>
                <div className="element-block">
                  <div className="elements">Iron</div>
                  <div className="percentage">&nbsp; {concentrations.iron}</div>
                </div>
              </div>
              <div className="third-block">
                <div className="element-block">
                  <div className="elements">Palladium</div>
                  <div className="percentage">
                    {" "}
                    &nbsp; {concentrations.palladium}
                  </div>
                </div>
                <div className="element-block">
                  <div className="elements">Cobalt</div>
                  <div className="percentage">
                    &nbsp; {concentrations.cobalt}
                  </div>
                </div>
                <div className="element-block">
                  <div className="elements">Rhenium</div>
                  <div className="percentage">
                    &nbsp; {concentrations.rhenium}
                  </div>
                </div>
                <div className="element-block">
                  <div className="elements">Tungsten</div>
                  <div className="percentage">
                    &nbsp; {concentrations.tungsten}
                  </div>
                </div>
                <div className="element-block">
                  <div className="elements">Manganese</div>
                  <div className="percentage">
                    &nbsp; {concentrations.manganese}
                  </div>
                </div>
                <div className="element-block">
                  <div className="elements">Indium</div>
                  <div className="percentage">
                    &nbsp; {concentrations.indium}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrintPreview;
