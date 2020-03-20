import React, { useState, useEffect } from "react";
import {
  Typography,
  InputAdornment,
  TextField,
  Button,
  Paper,
  List,
  CircularProgress
} from "@material-ui/core";
import { Search, PersonAdd, DeleteForever } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

import CustomerListItem from "../components/CustomerListItem";

const Customers = () => {
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [checked, setChecked] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const getCustomers = async () => {
      const res = await axios.get("https://www.dashboardapi.etiennemuhr.at/api/v1/customers");
      setCustomers(res.data.data);
      setLoading(false);
    };
    getCustomers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = e => event => {
    const value = e._id;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const allCheckedHandler = value => {
    let allCheckedItems = [];
    if (checked.length === 0 && allChecked === false) {
      customers.forEach(customer => allCheckedItems.push(customer._id));
      setChecked(allCheckedItems);
    } else if (checked.length > 0 && allChecked === true) {
      setChecked([]);
    } else {
      customers.forEach(customer => allCheckedItems.push(customer._id));
      setChecked(allCheckedItems);
    }
    setAllChecked(!allChecked);
  };

  if (allChecked && checked.length === 0 && customers.length !== 0) {
    setAllChecked(false);
  }
  if (!loading && checked.length === customers.length && !allChecked) {
    setAllChecked(true);
  }

  let filteredCustomers;
  if (!loading) {
    filteredCustomers = customers.filter(customer => {
      const phoneTrimmed = customer.phone.replace(" ", "");
      const contactPersonTrimmed = customer.contactPerson.replace(/ /g, "");
      const contactPersonLowerCase = customer.contactPerson.toLowerCase();
      const companyLowerCase = customer.company.toLowerCase();
      return (
        customer.company.includes(search) ||
        customer.zipCode.includes(search) ||
        customer.city.includes(search) ||
        customer.phone.includes(search) ||
        phoneTrimmed.includes(search) ||
        customer.contactPerson.includes(search) ||
        contactPersonTrimmed.includes(search) ||
        customer.revenue.includes(search) ||
        contactPersonLowerCase.includes(search) ||
        companyLowerCase.includes(search) ||
        !customer.company.search(new RegExp(search, "i")) ||
        !customer.city.search(new RegExp(search, "i")) ||
        !customer.contactPerson.search(new RegExp(search, "i")) ||
        !customer.revenue.search(new RegExp(search, "i")) ||
        !contactPersonTrimmed.search(new RegExp(search, "i"))
      );
    });
  }

  const { enqueueSnackbar } = useSnackbar();

  const handleMultiDelete = () => {
    const getCustomers = async () => {
      try {
        const res = await axios.get(
          "https://www.dashboardapi.etiennemuhr.at/api/v1/customers"
        );
        setCustomers(res.data.data);
        setLoading(false);
        return null;
      } catch (error) {
        enqueueSnackbar("Bitte laden Sie die Seite neu", {
          variant: "error"
        });
        setLoading(false);
      }
    };
    const multidelete = async () => {
      try {
        checked.map(async (check, index) => {
          try {
            await axios.delete(
              `https://www.dashboardapi.etiennemuhr.at/api/v1/customers/${check}`
            );
            if (checked.length === index + 1) {
              enqueueSnackbar("Alle ausgewählten Kunden gelöscht", {
                variant: "success"
              });
              getCustomers();
            }
          } catch (error) {
            if (checked.length === index + 1) {
              enqueueSnackbar(
                "Das hat leider nicht funktioniert. Bitte versuchen Sie es später erneut",
                {
                  variant: "error"
                }
              );
            }
          }
        });
      } catch (error) {
      }
    };
    multidelete();

    setChecked([]);
  };

  return (
    <div>
      <div className="headerWrapper__Customers">
        <div className="leftItemsHead__Customers">
          <Typography component="p" variant="h5">
            <b>Kunden</b>
          </Typography>
          <TextField
            className="searchField__Customers"
            label="Suchen"
            variant="outlined"
            id="input-with-icon-adornment"
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </div>
        {checked.length > 0 && (
          <div className="deleteButton__Customers">
            <Button
              variant="contained"
              color="primary"
              style={{ color: "white", backgroundColor: "red" }}
              startIcon={<DeleteForever></DeleteForever>}
              onClick={handleMultiDelete}
            >
              Alle ausgewählten Kunden löschen?
            </Button>
          </div>
        )}
        <div className="rightItemsHead__Customers">
          <Link to="/addcustomer" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PersonAdd></PersonAdd>}
              style={{ marginTop: "50px" }}
            >
              Kunden hinzufügen
            </Button>
          </Link>
          <br />
          <br />
          {/* <Button
            variant="outlined"
            color="primary"
            startIcon={<FilterList></FilterList>}
          >
            Filter anwenden
          </Button> */}
        </div>
      </div>

      <div className="cutomerList__Customers">
        <Paper>
          <List>
            <CustomerListItem
              value={{
                id: 0,
                head: true,
                company: "Unternehmen",
                zipCode: "Postleitzahl ",
                city: "/ Ort",
                phone: "Telefonnummer",
                contactPerson: "Ansprechpartner",
                revenue: "Umsatz",
                handleChecked: handleChange,
                allChecked: allChecked,
                allCheckedHandler
              }}
            ></CustomerListItem>

            {!loading ? (
              !search === 0 ? (
                customers.map(value => (
                  <CustomerListItem
                    value={value}
                    button
                    key={value._id}
                    handleChange={handleChange}
                    checked={checked}
                  ></CustomerListItem>
                ))
              ) : (
                filteredCustomers.map(value => (
                  <CustomerListItem
                    value={value}
                    button
                    key={value._id}
                    handleChange={handleChange}
                    checked={checked}
                  ></CustomerListItem>
                ))
              )
            ) : (
              <div className="loading__Customers">
                <CircularProgress />
              </div>
            )}
          </List>
        </Paper>
      </div>
    </div>
  );
};

export default Customers;
