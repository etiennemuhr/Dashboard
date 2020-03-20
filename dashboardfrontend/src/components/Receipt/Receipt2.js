import React, { Fragment, useEffect, useState } from "react";
import { Paper, Button, CircularProgress } from "@material-ui/core";
import { Edit, Delete, CloudDownload } from "@material-ui/icons";
import moment from "moment/min/moment-with-locales";
import axios from "axios";
import { red, teal } from "@material-ui/core/colors";
import { Redirect } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import { useSnackbar } from "notistack";
import { PDFDownloadLink } from "@react-pdf/renderer";

import ReceiptPDF from "../../pages/Pdf";

moment.locale("de");

const Receipt = props => {
  const [customerData, setCustomerData] = useState();
  const [settings, setSettings] = useState();
  const [redirect, setRedirect] = useState(false);

  const { _id, customer } = props.history;

  const { enqueueSnackbar } = useSnackbar();

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
      const settings = await axios.get(
        `https://www.dashboardapi.etiennemuhr.at/api/v1/settings`
      );
      setSettings(settings.data.data[0]);
    };
    getSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = () => {
    const deleteReceipt = async () => {
      await axios.delete(`https://www.dashboardapi.etiennemuhr.at/api/v1/receipts/${_id}`);
      setRedirect(true);
      enqueueSnackbar("Rechnung gelöscht", {
        variant: "success"
      });
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
        {customerData && settings ? (
          <PDFViewer style={{ height: "1160px", width: "800px" }} >
            <ReceiptPDF
              receiptData={props.history}
              settingsData={settings}
              customerData={customerData}
            />
          </PDFViewer>
        ) : (
          <CircularProgress></CircularProgress>
        )}

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
            
            {customerData && settings ? (
       
       <PDFDownloadLink style={{textDecoration: "none", margin:"0", padding: "0"}} document={<ReceiptPDF receiptData={props.history}
         settingsData={settings}
         customerData={customerData}  />} fileName={`Rechnung_${props.history.receiptNumber}__${moment(props.history.createdAt).format("DD_MM_YYYY")}.pdf`}>
          {({ blob, url, loading, error }) => (loading ? <CircularProgress></CircularProgress> : <Button
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
            </Button>)}
       </PDFDownloadLink>
       
        ) : (
          <CircularProgress></CircularProgress>
        )}
            
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
