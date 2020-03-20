import React from "react";
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  Icon
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Link } from "react-router-dom";

const Header = props => {
  return (
    <div>
      <div className="headerWrapper__Customers">
        <div className="leftItemsHead__Customers">
          <Typography component="p" variant="h5">
            <b>{props.title}</b>
          </Typography>
          <TextField
            className="searchField__Customers"
            label="Suchen"
            variant="outlined"
            id="input-with-icon-adornment"
            value={props.search}
            onChange={e => props.searchHandler(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </div>
        <div className="rightItemsHead__Customers">
          <Link to={props.linkTo} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Icon>{props.addIcon}</Icon>}
              style={{ marginTop: "50px" }}
            >
              {props.addText}
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
    </div>
  );
};

export default Header;
