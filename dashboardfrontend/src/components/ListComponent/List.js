import React, { useState, Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  CircularProgress,
  Button
} from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";

import { Redirect } from "react-router-dom";

const ListComponent = props => {
  const { listHead, listBody, loading } = props;
  const [checked, setChecked] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [redirectData, setRedirectData] = useState(false);

  const { search } = props;

  const handleChecked = e => {
    const helperArray = [...checked];
    if (helperArray.includes(e.target.id)) {
      helperArray.splice(helperArray.indexOf(e.target.id), 1);
    } else {
      helperArray.push(e.target.id);
    }
    setChecked(helperArray);
  };

  const handleAllChecked = () => {
    let helperArray = [...checked];
    if (checked.length === 0) {
      listBody.map(listItem => {
        return helperArray.push(listItem._id);
      });
    } else if (
      checked.length >= 1 &&
      checked.length !== listBody.length &&
      allChecked
    ) {
      helperArray = [];
    } else if (
      checked.length >= 1 &&
      checked.length !== listBody.length &&
      !allChecked
    ) {
      helperArray = [];
      listBody.map(listItem => {
        return helperArray.push(listItem._id);
      });
    } else {
      helperArray = [];
    }
    setChecked(helperArray);
    setAllChecked(!allChecked);
  };

  if (!loading && listBody.length > 0) {
    if (allChecked && checked.length === 0) {
      setAllChecked(false);
    }
    if (!allChecked && checked.length === listBody.length) {
      setAllChecked(true);
    }
  }

  const prepareRedirect = data => {
    setRedirectData(data);
    setRedirect(true);
  };

  const handleMultiDelete = () => {
    checked.map((check, index) => {
      props.getSelectedData(check, index, checked.length);
      return null;
    });
    setChecked([]);
  };

  let filteredReceipt;
  if (!loading) {
    filteredReceipt = listBody.filter(receipt => {
      return receipt.receiptNumber.includes(search);
    });
  }
  return (
    <Fragment>
      {checked.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="deleteButton__List">
            <Button
              variant="contained"
              color="primary"
              style={{ color: "white", backgroundColor: "red" }}
              startIcon={<DeleteForever></DeleteForever>}
              onClick={handleMultiDelete}
            >
              Alle ausgewählten Rechnungen löschen?
            </Button>
          </div>
        </div>
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <Paper style={{ marginTop: "25px" }}>
          <Table>
            <TableHead>
              <TableRow>
                {listHead.map((head, index) => {
                  if (index === 0) {
                    return (
                      <Fragment key={index}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={handleAllChecked}
                            checked={allChecked}
                          />
                        </TableCell>
                        <TableCell key={index} align="center">
                          {head}
                        </TableCell>
                      </Fragment>
                    );
                  } else {
                    return (
                      <TableCell key={index} align="center">
                        {head}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {listBody.length > 0 &&
                filteredReceipt.map(row => (
                  <TableRow key={row._id} className="listItem__List">
                    <TableCell padding="checkbox">
                      <Checkbox
                        id={row._id}
                        checked={checked.includes(row._id)}
                        onClick={handleChecked}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      onClick={() => prepareRedirect(row)}
                    >
                      {row.receiptNumber}
                    </TableCell>
                    <TableCell
                      align="center"
                      onClick={() => prepareRedirect(row)}
                    >
                      {props.customers.map(customer => {
                        if (customer._id === row.customer) {
                          return customer.company;
                        }
                        return null;
                      })}
                    </TableCell>
                    <TableCell
                      align="center"
                      onClick={() => prepareRedirect(row)}
                    >{`${row.net}€`}</TableCell>
                    <TableCell
                      align="center"
                      onClick={() => prepareRedirect(row)}
                    >{`${row.ust}€`}</TableCell>
                    <TableCell
                      align="center"
                      onClick={() => prepareRedirect(row)}
                    >{`${row.brutto}€`}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      )}
      {redirect ? (
        <Redirect
          push
          to={{
            pathname: `receipts/${redirectData._id}`,
            state: { data: redirectData }
          }}
        ></Redirect>
      ) : null}
    </Fragment>
  );
};

export default ListComponent;
