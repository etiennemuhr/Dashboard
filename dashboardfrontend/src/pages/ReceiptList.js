import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

import Header from "../components/Header";
import List from "../components/ListComponent/List";

const listHead = ["Rechnungsnummer", "Unternehmen", "Netto", "Ust", "Brutto"];

const Receipt = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [listBody, setListBody] = useState();
  const [customers, setCustomers] = useState();

  const searchHandler = value => {
    setSearch(value);
  };
  useEffect(() => {
    const getReceipts = async () => {
      const res = await axios.get("https://www.dashboardapi.etiennemuhr.at/api/v1/receipts");
      const customers = await axios.get(
        "https://www.dashboardapi.etiennemuhr.at/api/v1/customers"
      );
      setCustomers(customers.data.data);
      setListBody(res.data.data);
      setLoading(false);
    };
    getReceipts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const getSelectedData = async (ids, index, length) => {
    const deleteMultiReceipts = async () => {
      try {
        await axios.delete(`https://www.dashboardapi.etiennemuhr.at/api/v1/receipts/${ids}`);
        setLoading(false);
        if (length === index + 1) {
          getData();
        }
        if (length === index + 1) {
          enqueueSnackbar("Alle ausgewählten Rechnungen gelöscht", {
            variant: "success"
          });
        }
        return null;
      } catch (error) {
        if (length === index + 1) {
          enqueueSnackbar(
            "Das hat leider nicht funktioniert. Bitte versuchen Sie es später erneut",
            {
              variant: "error"
            }
          );
        }
      }
    };
    deleteMultiReceipts();
  };

  const getData = () => {
    const getReceipts = async () => {
      try {
        const res = await axios.get(
          "https://www.dashboardapi.etiennemuhr.at/api/v1/receipts"
        );
        setListBody(res.data.data);
        setLoading(false);
      } catch (error) {
        enqueueSnackbar("Bitte laden Sie die Seite neu", {
          variant: "error"
        });
      }
    };
    getReceipts();
  };

  return (
    <Fragment>
      <Header
        title="Rechnungen"
        addIcon="receipt"
        addText="Rechnung erstellen"
        searchHandler={searchHandler}
        search={search}
        linkTo="/addReceipt"
      />
      <List
        listHead={listHead}
        listBody={listBody}
        customers={customers}
        loading={loading}
        getSelectedData={getSelectedData}
        search={search}
      />
    </Fragment>
  );
};

export default Receipt;
