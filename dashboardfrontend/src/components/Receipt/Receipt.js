import React, { Fragment, useEffect, useState } from "react";
import { Paper, Button } from "@material-ui/core";
import { Edit, Delete, CloudDownload } from "@material-ui/icons";
import moment from "moment/min/moment-with-locales";
import axios from "axios";
import { red, teal } from "@material-ui/core/colors";
import { Redirect } from "react-router-dom";

moment.locale("de");

const Receipt = props => {
  const [customerData, setCustomerData] = useState();
  const [settings, setSettings] = useState();
  const [redirect, setRedirect] = useState(false);

  const {
    _id,
    net,
    ust,
    brutto,
    receiptNumber,
    customer,
    createdAt
  } = props.history;

  useEffect(() => {
    const getCustomer = async () => {
      const customerData = await axios.get(
        `https://www.dashboardapi.etiennemuhr.at/api/v1/customers/${customer}`
      );
      setCustomerData(customerData.data.data);
    };
    getCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const getSettings = async () => {
      const settings = await axios.get(`https://www.dashboardapi.etiennemuhr.at/api/v1/settings`);
      setSettings(settings.data.data[0]);
    };
    getSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = () => {
    const deleteReceipt = async () => {
      const deletedItem = await axios.delete(
        `https://www.dashboardapi.etiennemuhr.at/api/v1/receipts/${_id}`
      );
      setRedirect(true);
    };
    deleteReceipt();
  };

  const handleEdit = () => {
    props.changeMode();
  };

  const handlePrint = () => {};

  return (
    <Fragment>
      <div style={{ display: "flex" }}>
        <Paper className="wrapper__Receipt">
          <img
            // src="https://data1.logaster.com/logotype/data/3735617/png/512/1/?c=a84dfdf6e691499b373894c954e902bb&rk=766888"
            className="logo__Receipt"
            alt="logo"
          ></img>
          <div className="gridWrapper__Receipt">
            <div className="sendDiv__Receipt">
              <small>
                {settings &&
                  `${settings.company} ${settings.street} | ${settings.zipCode} ${settings.city}`}
              </small>
              <br />
              <p>
                {customerData && customerData.company}
                <br /> {customerData && customerData.street}
                <br />
                {customerData && `${customerData.zipCode} ${customerData.city}`}
              </p>
            </div>
            <div className="companyInfoDiv__Receipt">
              <p>
                {settings && settings.company}
                <br />
                {settings && settings.street}
                <br />
                {settings && `${settings.zipCode} ${settings.city}`}
              </p>
              <p>
                {settings && settings.phone}
                <br />
                {settings && settings.email}
                <br />
                {settings && settings.website}
              </p>
            </div>
            <h2 className="receiptBill__receipt">Rechnung</h2>
            <div>
              <p>
                Rechnungsnummer: {receiptNumber}
                <br />
                Kundennummer: {customer}
                <br />
              </p>
            </div>
            <div>
              <p>
                Rechnungsdatum: {moment(createdAt).format("Do MMMM YYYY")}
                <br />
                E-Mail: {settings && settings.email}
                <br />
              </p>
            </div>
          </div>
          <div>
            <table className="table__Receipt">
              <thead>
                <tr className="tableHead__Receipt">
                  <th>Pos.</th>
                  <th>Artikelnummer</th>
                  <th>Bezeichnung</th>
                  <th className="tdAmountInput__Receipt">Menge</th>
                  <th className="tdPricePerProductInput__Receipt">
                    Preis/Einheit (€)
                  </th>
                  <th>Gesamt(€)</th>
                </tr>
              </thead>
              <tbody>
                {props.history.receiptData.map(data => (
                  <Fragment key={data._id}>
                    <tr>
                      <td>{data.pos}</td>
                      <td align="center">{data.productNumber}</td>
                      <td align="center">{data.type}</td>
                      <td align="center">{data.amount}</td>
                      <td align="center">{`${data.pricePerProduct}€`}</td>
                      <td align="center">{`${data.total}€`}</td>
                    </tr>
                  </Fragment>
                ))}
                <tr>
                  <td>Netto</td>
                  <td align="right">{`${net}€`}</td>
                </tr>
                <tr>
                  <td>Ust</td>
                  <td align="right">{`${ust}€`}</td>
                </tr>
                <tr>
                  <td>Brutto</td>
                  <td align="right">{`${brutto}€`}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <footer>
            <small className="footerSmall__Receipt">
              Muster GmbH · Sparkasse Berlin · Konto 10 25 25 25 · BLZ 500 600
              26 · IBAN DE10 25 25 25 500 600 26 02· BIC HERAKLES02 Sitz der
              Gesellschaft: Berlin, Deutschland · Geschäftsführung: Max
              Mustermann · Handelsregister: AG Berlin HRB 123456 · USt-IdNr.
              DE216398573 Diese Rechnungsvorlage wurde erstellt von
              www.weclapp.com
            </small>
          </footer>
        </Paper>
        <Paper className="receiptButtons_Receipt">
          <div className="buttonContainer_Receipt">
            <Button
              onClick={handleEdit}
              variant="outlined"
              color="primary"
              startIcon={<Edit />}
              style={{ width: "100%" }}
            >
              Bearbeiten
            </Button>
            <br />
            <br />
            <Button
              onClick={handlePrint}
              variant="outlined"
              color="primary"
              startIcon={<CloudDownload />}
              style={{
                color: teal[400],
                borderColor: teal[400],
                width: "100%"
              }}
            >
              Herunterladen
            </Button>
            <br />
            <br />
            <Button
              onClick={handleDelete}
              variant="outlined"
              style={{
                color: red[500],
                borderColor: red[500],
                width: "100%"
              }}
              startIcon={<Delete />}
            >
              Rechnung Löschen
            </Button>
          </div>
        </Paper>
      </div>
      {redirect && <Redirect to="/receipts"></Redirect>}
    </Fragment>
  );
};

export default Receipt;
