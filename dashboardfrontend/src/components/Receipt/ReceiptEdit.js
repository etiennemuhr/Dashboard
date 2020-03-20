import React, { useState, useEffect, Fragment } from "react";
import { Paper, Button, CircularProgress } from "@material-ui/core";
import { Save, Delete, ArrowBack } from "@material-ui/icons";
import { red, green } from "@material-ui/core/colors";
import { Redirect } from "react-router-dom";
import { useSnackbar } from "notistack";

import SingelTableRow from "../AddReceipt/SingelTableRow";
import axios from "axios";

const Receipt = props => {
  const { history } = props;

  const [table, setTable] = useState([]);
  const [total] = useState(0);
  const [sum, setSum] = useState({ net: 0, ust: 0.2, brutto: 0 });
  const [settingsData, setSettingsData] = useState();
  const [redirect, setRedirect] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const addProduct = () => {
    const newRow = {
      pos: table.length + 1,
      productNumber: "",
      type: "",
      amount: "",
      pricePerProduct: "",
      total: 0
    };
    setTable([...table, newRow]);
  };

  const updateHandler = (e, id) => {
    const tableCopy = table.slice();
    let changedRow = tableCopy.find(row => row.pos === id);
    changedRow = { ...changedRow, [e.target.name]: e.target.value };
    if (e.target.name === "amount") {
      changedRow.total = changedRow.pricePerProduct * e.target.value;
    }
    if (e.target.name === "pricePerProduct") {
      changedRow.total = e.target.value * changedRow.amount;
    }
    tableCopy.splice(
      tableCopy.findIndex(row => row.pos === id),
      1,
      changedRow
    );
    setTable(tableCopy);
    let calculatedTotal = tableCopy
      .map(item => total + item.total)
      .reduce(function(pv, cv) {
        return pv + cv;
      }, 0);
    setSum({
      net: calculatedTotal.toFixed(2) || 0,
      ust: (calculatedTotal * (settingsData.ust / 100)).toFixed(2),
      brutto: (calculatedTotal * (settingsData.ust / 100 + 1)).toFixed(2)
    });
  };

  const deleteHandler = id => {
    const tableCopy = table.slice();
    const filteredArray = tableCopy.filter(row => row.pos !== id);
    let position = 1;
    filteredArray.forEach(row => {
      row.pos = position;
      position++;
    });
    setTable(filteredArray);
    let calculatedTotal = filteredArray
      .map(item => total + item.total)
      .reduce(function(pv, cv) {
        return pv + cv;
      }, 0);
    setSum({
      net: calculatedTotal.toFixed(2) || 0,
      ust: (calculatedTotal * (settingsData.ust / 100)).toFixed(2),
      brutto: (calculatedTotal * (settingsData.ust / 100 + 1)).toFixed(2)
    });
  };

  useEffect(() => {
    setTable(history.receiptData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  useEffect(() => {
    const getSettingData = async () => {
      const settings = await axios.get(
        "https://www.dashboardapi.etiennemuhr.at/api/v1/settings"
      );
      setSettingsData(settings.data.data[0]);
      let calculatedTotal = history.receiptData
        .map(item => total + item.total)
        .reduce(function(pv, cv) {
          return pv + cv;
        }, 0);
      setSum({
        net: calculatedTotal.toFixed(2) || 0,
        ust: (calculatedTotal * (settings.data.data[0].ust / 100)).toFixed(2),
        brutto: (
          calculatedTotal *
          (settings.data.data[0].ust / 100 + 1)
        ).toFixed(2)
      });
    };
    getSettingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = () => {
    const deleteReceipt = async () => {
      await axios.delete(
        `https://www.dashboardapi.etiennemuhr.at/api/v1/receipts/${history._id}`
      );
      setRedirect(true);
      enqueueSnackbar("Rechnung gelöscht", {
        variant: "success"
      });
    };
    deleteReceipt();
  };

  const handleSave = () => {
    const saveData = async () => {
      const data = {
        receiptData: table,
        net: sum.net,
        ust: sum.ust,
        brutto: sum.brutto
      };
      await axios.put(
        `https://www.dashboardapi.etiennemuhr.at/api/v1/receipts/${history._id}`,
        data
      );
      props.changeMode();
    };
    saveData();
  };

  const handleAbort = () => {
    props.changeMode();
  };

  return (
    <Fragment>
      {props.history ? (
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
                  {settingsData &&
                    `${settingsData.company} ${settingsData.street} | ${settingsData.zipCode} ${settingsData.city}`}
                </small>
                <br />
                <p>
                  Lunchtym GmbH
                  <br /> Musterstrasse 4
                  <br /> {`${"1090"} ${"Wien"}`}
                </p>
              </div>
              <div className="companyInfoDiv__Receipt">
                <p>
                  {settingsData && settingsData.company}
                  <br />
                  {settingsData && settingsData.street}
                  <br />
                  {settingsData &&
                    `${settingsData.zipCode} ${settingsData.city}`}
                </p>
                <br />
                <p>
                  {settingsData && settingsData.phone}
                  <br />
                  {settingsData && settingsData.email}
                  <br />
                  {settingsData && settingsData.website}
                </p>
                <br />
              </div>
              <h2 className="receiptBill__receipt">Rechnung</h2>
              <br />
              <div>
                <p>
                  Rechnungsnummer: {history.receiptNumber}
                  <br />
                  Kundennummer: {history.customer}
                  <br />
                </p>
              </div>
              <div>
                <p>
                  Rechnungsdatum: {history.createdAt}
                  <br />
                  E-Mail: {settingsData && settingsData.email}
                  <br />
                </p>
              </div>
            </div>
            <br />
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
                  {table.map(product => (
                    <SingelTableRow
                      key={product.pos}
                      product={product}
                      updateHandler={updateHandler}
                      deleteHandler={deleteHandler}
                    />
                  ))}
                  <tr>
                    <td colSpan="6">
                      <button
                        onClick={addProduct}
                        className="tableButton__Receipt"
                      >
                        Artikel hinzufügen
                      </button>
                    </td>
                  </tr>
                  <Fragment>
                    <tr>
                      <td colSpan="4"></td>
                      <td style={{ paddingLeft: "50px" }}>Netto</td>
                      <td>{`${sum.net}€`}</td>
                    </tr>
                    <tr>
                      <td colSpan="4"></td>
                      <td style={{ paddingLeft: "50px" }}>Ust</td>
                      <td>{`${sum.ust}€`}</td>
                    </tr>
                    <tr>
                      <td colSpan="4"></td>
                      <td style={{ paddingLeft: "50px" }}>Brutto</td>
                      <td>{`${sum.brutto}€`}</td>
                    </tr>
                  </Fragment>
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
          <Paper className="receiptButtonsEdit_Receipt">
            <div className="buttonContainer_Receipt">
              <Button
                style={{ width: "100%" }}
                variant="outlined"
                startIcon={<ArrowBack />}
                color="primary"
                onClick={handleAbort}
              >
                Abbrechen
              </Button>
              <br />
              <br />
              <Button
                variant="outlined"
                startIcon={<Save />}
                style={{
                  color: green[500],
                  borderColor: green[500],
                  width: "100%"
                }}
                onClick={handleSave}
              >
                Speichern
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
          {redirect && <Redirect to="/receipts"></Redirect>}
        </div>
      ) : (
        <CircularProgress></CircularProgress>
      )}
    </Fragment>
  );
};

export default Receipt;
