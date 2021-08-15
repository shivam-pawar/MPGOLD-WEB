import React from "react";
import moment from "moment";
import firebaseDB from "../config/firebase";

function PrintPreview({ customerValues, concentrations, isGold }) {
  const handlePostRequest = () => {
    const records = firebaseDB.ref("mpgold-web-default-rtdb");
    const dataToPush = {
      serial_number: customerValues.srNumber,
      report_date: customerValues.dateTime,
      customer_name: customerValues.customerName,
      sample_type: customerValues.sampleType,
      weight: customerValues.weight,
      gold_purity: concentrations.gold,
      silver_purity: concentrations.silver,
    };
    try {
      records.push(dataToPush);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="main-page">
      <div className="sub-page">
        <div className="customer-details">
          <div className="customer-name">
            Name: {customerValues.customerName}
          </div>
          <div className="customer-time">
            Time: {moment(Date().toLocaleString()).format("hh:mm:ss a")}
          </div>
          <div className="customer-sr">
            Serial No.: {customerValues.srNumber}
          </div>
        </div>
        <div className="customer-date-sample">
          <div className="customer-date">
            Date: {moment(Date().toLocaleString()).format("Do MMMM YYYY")}
          </div>
          <div className="customer-sample">
            Sample: {customerValues.sampleType}
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
          <div className="weight">
            WEIGHT : {customerValues.weight + " gram"}
          </div>
        </div>
        <hr className="separator" />
        <div className="concentration-block">
          <div className="first-block">
            <div className="element-block">
              <div className="elements">Copper</div>
              <div className="percentage">: &nbsp; {concentrations.copper}</div>
            </div>
            <div className="element-block">
              {isGold === "gold" ? (
                <>
                  <div className="elements">Silver</div>
                  <div className="percentage">
                    : &nbsp; {concentrations.silver}
                  </div>
                </>
              ) : (
                <>
                  <div className="elements">Gold</div>
                  <div className="percentage">
                    : &nbsp; {concentrations.gold}
                  </div>
                </>
              )}
            </div>
            <div className="element-block">
              <div className="elements">Zinc</div>

              <div className="percentage">: &nbsp; {concentrations.zinc}</div>
            </div>
            <div className="element-block">
              <div className="elements">Cadmium</div>
              <div className="percentage">
                : &nbsp; {concentrations.cadmium}
              </div>
            </div>
            <div className="element-block">
              <div className="elements">Lead</div>
              <div className="percentage">: &nbsp; {concentrations.lead}</div>
            </div>
            <div className="element-block">
              <div className="elements">Nickel</div>
              <div className="percentage">: &nbsp; {concentrations.nickel}</div>
            </div>
          </div>
          <div className="vl"></div>
          <div className="second-block">
            <div className="element-block">
              <div className="elements">Iridium</div>
              <div className="percentage">
                : &nbsp; {concentrations.iridium}
              </div>
            </div>
            <div className="element-block">
              <div className="elements">Ruthenium</div>
              <div className="percentage">
                : &nbsp; {concentrations.ruthenium}
              </div>
            </div>
            <div className="element-block">
              <div className="elements">Osmium</div>
              <div className="percentage">: &nbsp; {concentrations.osmium}</div>
            </div>
            <div className="element-block">
              <div className="elements">Tin</div>
              <div className="percentage">: &nbsp; {concentrations.tin}</div>
            </div>
            <div className="element-block">
              <div className="elements">Rhodium</div>
              <div className="percentage">
                : &nbsp; {concentrations.rhodium}
              </div>
            </div>
            <div className="element-block">
              <div className="elements">Iron</div>
              <div className="percentage">: &nbsp; {concentrations.iron}</div>
            </div>
          </div>
          <div className="vl"></div>
          <div className="third-block">
            <div className="element-block">
              <div className="elements">Palladium</div>
              <div className="percentage">: &nbsp; 0.00</div>
            </div>
            <div className="element-block">
              <div className="elements">Cobalt</div>
              <div className="percentage">: &nbsp; {concentrations.cobalt}</div>
            </div>
            <div className="element-block">
              <div className="elements">Rhenium</div>
              <div className="percentage">
                : &nbsp; {concentrations.rhenium}
              </div>
            </div>
            <div className="element-block">
              <div className="elements">Tungsten</div>
              <div className="percentage">
                : &nbsp; {concentrations.tungsten}
              </div>
            </div>
            <div className="element-block">
              <div className="elements">Manganese</div>
              <div className="percentage">
                : &nbsp; {concentrations.manganese}
              </div>
            </div>
            <div className="element-block">
              <div className="elements">Bismuth</div>
              <div className="percentage">
                : &nbsp; {concentrations.bismuth}
              </div>
            </div>
          </div>
        </div>
        <div className="copy-form">
          <div className="customer-details">
            <div className="customer-name">
              Name: {customerValues.customerName}
            </div>
            <div className="customer-time">
              Time: {moment(Date().toLocaleString()).format("hh:mm:ss a")}
            </div>
            <div className="customer-sr">
              Serial No.: {customerValues.srNumber}
            </div>
          </div>
          <div className="customer-date-sample">
            <div className="customer-date">
              Date: {moment(Date().toLocaleString()).format("Do MMMM YYYY")}
            </div>
            <div className="customer-sample">
              Sample: {customerValues.sampleType}
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
            <div className="weight">
              WEIGHT : {customerValues.weight + " gram"}
            </div>
          </div>
          <hr className="separator" />
          <div className="concentration-block">
            <div className="first-block">
              <div className="element-block">
                <div className="elements">Copper</div>
                <div className="percentage">
                  : &nbsp; {concentrations.copper}
                </div>
              </div>
              <div className="element-block">
                {isGold === "gold" ? (
                  <>
                    <div className="elements">Silver</div>
                    <div className="percentage">
                      : &nbsp; {concentrations.silver}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="elements">Gold</div>
                    <div className="percentage">
                      : &nbsp; {concentrations.gold}
                    </div>
                  </>
                )}
              </div>
              <div className="element-block">
                <div className="elements">Zinc</div>

                <div className="percentage">: &nbsp; {concentrations.zinc}</div>
              </div>
              <div className="element-block">
                <div className="elements">Cadmium</div>
                <div className="percentage">
                  : &nbsp; {concentrations.cadmium}
                </div>
              </div>
              <div className="element-block">
                <div className="elements">Lead</div>
                <div className="percentage">: &nbsp; {concentrations.lead}</div>
              </div>
              <div className="element-block">
                <div className="elements">Nickel</div>
                <div className="percentage">
                  : &nbsp; {concentrations.nickel}
                </div>
              </div>
            </div>
            <div className="vl"></div>
            <div className="second-block">
              <div className="element-block">
                <div className="elements">Iridium</div>
                <div className="percentage">
                  : &nbsp; {concentrations.iridium}
                </div>
              </div>
              <div className="element-block">
                <div className="elements">Ruthenium</div>
                <div className="percentage">
                  : &nbsp; {concentrations.ruthenium}
                </div>
              </div>
              <div className="element-block">
                <div className="elements">Osmium</div>
                <div className="percentage">
                  : &nbsp; {concentrations.osmium}
                </div>
              </div>
              <div className="element-block">
                <div className="elements">Tin</div>
                <div className="percentage">: &nbsp; {concentrations.tin}</div>
              </div>
              <div className="element-block">
                <div className="elements">Rhodium</div>
                <div className="percentage">
                  : &nbsp; {concentrations.rhodium}
                </div>
              </div>
              <div className="element-block">
                <div className="elements">Iron</div>
                <div className="percentage">: &nbsp; {concentrations.iron}</div>
              </div>
            </div>
            <div className="vl"></div>
            <div className="third-block">
              <div className="element-block">
                <div className="elements">Palladium</div>
                <div className="percentage">: &nbsp; 0.00</div>
              </div>
              <div className="element-block">
                <div className="elements">Cobalt</div>
                <div className="percentage">
                  : &nbsp; {concentrations.cobalt}
                </div>
              </div>
              <div className="element-block">
                <div className="elements">Rhenium</div>
                <div className="percentage">
                  : &nbsp; {concentrations.rhenium}
                </div>
              </div>
              <div className="element-block">
                <div className="elements">Tungsten</div>
                <div className="percentage">
                  : &nbsp; {concentrations.tungsten}
                </div>
              </div>
              <div className="element-block">
                <div className="elements">Manganese</div>
                <div className="percentage">
                  : &nbsp; {concentrations.manganese}
                </div>
              </div>
              <div className="element-block">
                <div className="elements">Bismuth</div>
                <div className="percentage">
                  : &nbsp; {concentrations.bismuth}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrintPreview;
