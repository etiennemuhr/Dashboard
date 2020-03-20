import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";

import SelectCustomer from "../components/AddReceipt/SelectCustomer";
import Receipt from "../components/AddReceipt/Receipt";
import axios from "axios";

const AddReceipt = () => {
  const [receiptData, setReceiptData] = useState([]);
  const getReceiptData = data => {
    if (data.length === 0) {
    } else {
      setReceiptData(data);
    }
  };

  const [validInput, setValidInput] = useState(false);
  const [chosenCustomer, setChosenCustomer] = useState();
  const [total, setTotal] = useState(0);
  const validInputHandler = val => {
    setValidInput(val);
  };

  const getTotal = data => {
    setTotal(data);
  };

  const chosenCustomerHandler = customer => {
    setChosenCustomer(customer);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setReceiptData([]);
  };
  const handleSave = async () => {
    const data = {
      receiptNumber: "1",
      customer: chosenCustomer._id,
      receiptData: receiptData,
      net: total.net,
      ust: total.ust,
      brutto: total.brutto
    };
    await axios.post("https://www.dashboardapi.etiennemuhr.at/api/v1/receipts", data);
    handleNext();
  };

  return (
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>
            Für welchen Kunden möchten Sie eine Rechnung erstellen?
          </StepLabel>
          <StepContent>
            <SelectCustomer
              validInputHandler={validInputHandler}
              chosenCustomerHandler={chosenCustomerHandler}
            />
            <div>
              <div style={{ marginLeft: "16px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!validInput}
                  onClick={handleNext}
                >
                  Weiter
                </Button>
              </div>
            </div>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Rechnung erstellen</StepLabel>
          <StepContent>
            <Receipt
              chosenCustomer={chosenCustomer}
              activeStep={activeStep}
              getReceiptData={getReceiptData}
              receiptData={receiptData}
              getTotal={getTotal}
              input={true}
            />
            <div>
              <div>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Zurück
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Weiter
                </Button>
              </div>
            </div>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Rechnung bestätigen</StepLabel>
          <StepContent>
            <Receipt
              chosenCustomer={chosenCustomer}
              receiptData={receiptData}
              getReceiptData={getReceiptData}
              getTotal={getTotal}
              final
            />
            <div>
              <div>
                <Button onClick={handleBack}>Zurück</Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Speichern
                </Button>
              </div>
            </div>
          </StepContent>
        </Step>
      </Stepper>
      {activeStep === 3 && (
        <Paper square elevation={0}>
          <Typography
            style={{
              marginLeft: "50px",
              fontSize: "20px",
              fontWeight: "bold",
              color: "green"
            }}
          >
            Die Rechnung wurde erfolgreich erstellt!
          </Typography>
          <Button
            onClick={handleReset}
            variant="contained"
            style={{ margin: "50px 20px" }}
            color="primary"
          >
            Noch eine Rechnung erstellen?
          </Button>
          <Link to="/receipts" style={{ textDecoration: "none" }}>
            <Button color="primary" variant="outlined">
              Zur Rechnungübersicht
            </Button>
          </Link>
        </Paper>
      )}
    </div>
  );
};

export default AddReceipt;
