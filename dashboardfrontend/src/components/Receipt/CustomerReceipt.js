import React, { useContext, useEffect, useState } from "react";
import {
  Paper,
  List,
  Typography,
  Divider,
  CircularProgress
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { Redirect } from "react-router-dom";

import ReceiptContext from "../../context/receipt/receiptContext";

const CustomerReceipt = props => {
  const { enqueueSnackbar } = useSnackbar();
  const receiptContext = useContext(ReceiptContext);

  const [redirect, setRedirect] = useState();

  const { customer } = props;

  const { loading, receiptData, error, getReceiptData } = receiptContext;

  useEffect(() => {
    getReceiptData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (error) {
      enqueueSnackbar(
        "Fehler bei laden der Rechnungsdaten. Bitte versuche Sie es später erneut",
        {
          variant: "error"
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleRedirect = to => {
    setRedirect(to);
  };
  return (
    <Paper style={{ height: "708px" }}>
      {loading ? (
        <CircularProgress />
      ) : error ? null : (
        <List>
          <Typography variant="h6" className="header__Customer">
            Übersicht Rechnungen
          </Typography>
          <Divider />
          {receiptData.data.filter(item => item.customer === customer)
            .length === 0 && (
            <div align="center" style={{ marginTop: "25px", fontSize: "22px" }}>
              Leider konnten wir noch keine Rechnung für diesen Kunden finden.
            </div>
          )}
          <div className="infoWrapper__Customer">
            <div style={{ width: "100%" }}>
              {receiptData.data
                .filter(item => item.customer === customer)
                .map(data => (
                  <div
                    className="receiptItem__Customer receiptItemWrapper__Customer"
                    key={data._id}
                    onClick={handleRedirect.bind(this, data)}
                  >
                    <Typography
                      variant="subtitle2"
                      className="receipText__Customer"
                    >
                      Rechnungsnummer: {data.receiptNumber}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      className="receipText__Customer"
                    >
                      Betrag: {data.brutto}€
                    </Typography>
                  </div>
                ))}
            </div>
          </div>
        </List>
      )}
      {redirect && (
        <Redirect
          push
          to={{
            pathname: `/receipts/${redirect._id}`,
            state: { data: redirect }
          }}
        ></Redirect>
      )}
    </Paper>
  );
};

export default CustomerReceipt;
