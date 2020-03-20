import React, { useState } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  TableCell,
  TableRow,
  TableBody,
  Table
} from "@material-ui/core";
import { Redirect } from "react-router-dom";

const CustomerListItem = props => {
  const { value } = props;
  const {
    _id,
    head,
    company,
    zipCode,
    city,
    phone,
    contactPerson,
    revenue,
    linkTo,
    allCheckedHandler,
    allChecked
  } = value;

  const [redirect, setRedirect] = useState();

  const handelAllChecked = val => () => {
    allCheckedHandler(val);
  };

  const { checked, handleChange } = props;

  return (
    <div>
      <ListItem
        value="1"
        key={value}
        dense
        button={props.button ? true : false}
        style={!props.button ? { borderBottom: "1px solid lightgrey" } : null}
      >
        <ListItemIcon>
          {head ? (
            <Checkbox
              edge="start"
              checked={allChecked}
              onClick={
                checked ? handelAllChecked("remove") : handelAllChecked("add")
              }
            />
          ) : (
            <Checkbox
              edge="start"
              checked={checked.indexOf(_id) !== -1}
              onClick={handleChange(value)}
            />
          )}
        </ListItemIcon>

        <ListItemText
          id={`checkbox-list-label-${value}`}
          primary={
            <div style={{ display: "flex" }}>
              <Table
                onClick={() => {
                  setRedirect(linkTo);
                }}
              >
                <TableBody>
                  <TableRow>
                    <TableCell
                      style={{
                        width: "20%",
                        textAlign: "center",
                        borderBottom: "none"
                      }}
                    >
                      {company}
                    </TableCell>
                    <TableCell
                      style={{
                        width: "20%",
                        textAlign: "center",
                        borderBottom: "none"
                      }}
                    >
                      {`${zipCode} ${city}`}
                    </TableCell>
                    <TableCell
                      style={{
                        width: "20%",
                        textAlign: "center",
                        borderBottom: "none"
                      }}
                    >
                      {phone}
                    </TableCell>
                    <TableCell
                      style={{
                        width: "20%",
                        textAlign: "center",
                        borderBottom: "none"
                      }}
                    >
                      {contactPerson}
                    </TableCell>
                    <TableCell
                      style={{
                        width: "20%",
                        textAlign: "center",
                        borderBottom: "none"
                      }}
                    >
                      {revenue}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          }
        ></ListItemText>
      </ListItem>
      {redirect ? (
        <Redirect
          push
          to={{
            pathname: `customer/${linkTo}`,
            state: { id: props.value._id, customer: value }
          }}
        ></Redirect>
      ) : null}
    </div>
  );
};

export default CustomerListItem;
