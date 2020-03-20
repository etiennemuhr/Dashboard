import React, { useState, useEffect, Fragment } from "react";
import { Paper } from "@material-ui/core";

import SingelTableRow from "./SingelTableRow";
import SingelTableRowNoInput from "./SingelTableRowNoInput";
import axios from "axios";

const Receipt = props => {
  const { chosenCustomer, getReceiptData, receiptData, getTotal } = props;
  const { company, street, zipCode, city, _id } = chosenCustomer;

  const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return dd + "." + mm + "." + yyyy;
  };

  const [table, setTable] = useState([]);
  const [total] = useState(0);
  const [sum, setSum] = useState({ net: 0, ust: 0.2, brutto: 0 });
  const [settingsData, setSettingsData] = useState();
  const [receiptNumber, setReceiptNumber] = useState();

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
  };

  useEffect(() => {
    if (receiptData.length > 0) {
      setTable(receiptData);
    }
  }, [receiptData]);

  useEffect(() => {
    getReceiptData(table);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);
  useEffect(() => {
    getTotal(sum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sum]);

  let calculatedTotal;

  if (props.final) {
  }

  useEffect(() => {
    const getSettingData = async () => {
      const settings = await axios.get(
        "https://www.dashboardapi.etiennemuhr.at/api/v1/settings"
      );
      setSettingsData(settings.data.data[0]);
      let calculatedTotal = receiptData
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
  useEffect(() => {
    const getLastReceiptNumber = async () => {
      const settings = await axios.get(
        "https://www.dashboardapi.etiennemuhr.at/api/v1/receipts/receiptNumber"
      );
      setReceiptNumber(parseInt(settings.data.data) + 1);
    };
    getLastReceiptNumber();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculatedTotal]);
  return (
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
            {company}
            <br /> {street}
            <br /> {`${zipCode} ${city}`}
          </p>
        </div>
        <div className="companyInfoDiv__Receipt">
          <p>
            {settingsData && settingsData.company}
            <br />
            {settingsData && settingsData.street}
            <br />
            {settingsData && `${settingsData.zipCode} ${settingsData.city}`}
          </p>
          <p>
            {settingsData && settingsData.phone}
            <br />
            {settingsData && settingsData.email}
            <br />
            {settingsData && settingsData.website}
          </p>
        </div>
        <h2 className="receiptBill__receipt">Rechnung</h2>
        <div>
          <p>
            Rechnungsnummer: {receiptNumber}
            <br />
            Kundennummer: {_id}
            <br />
          </p>
        </div>
        <div>
          <p>
            Rechnungsdatum: {getCurrentDate()}
            <br />
            E-Mail: {settingsData && settingsData.email}
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
            {props.input
              ? table.map(product => (
                  <SingelTableRow
                    key={product.pos}
                    product={product}
                    updateHandler={updateHandler}
                    deleteHandler={deleteHandler}
                  />
                ))
              : table.map(product => (
                  <SingelTableRowNoInput key={product.pos} product={product} />
                ))}
            {props.input && (
              <tr>
                <td colSpan="6">
                  <button onClick={addProduct} className="tableButton__Receipt">
                    Artikel hinzufügen
                  </button>
                </td>
              </tr>
            )}
            {props.final && (
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
            )}
          </tbody>
        </table>
      </div>
      <footer>
        <small className="footerSmall__Receipt">
          Muster GmbH · Sparkasse Berlin · Konto 10 25 25 25 · BLZ 500 600 26 ·
          IBAN DE10 25 25 25 500 600 26 02· BIC HERAKLES02 Sitz der
          Gesellschaft: Berlin, Deutschland · Geschäftsführung: Max Mustermann ·
          Handelsregister: AG Berlin HRB 123456 · USt-IdNr. DE216398573 Diese
          Rechnungsvorlage wurde erstellt von www.weclapp.com
        </small>
      </footer>
    </Paper>
  );
};

export default Receipt;
